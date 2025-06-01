import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import api from '../utils/api';

interface Alert {
  _id: string;
  name: string;
  criteria: string; // Accept string for compatibility
  value: number;
  days: string[];
  email: string;
  phone: string;
  createdAt: string;
}

interface AlertFormValues {
  name: string;
  criteria: 'Greater' | 'Less';
  value: number;
  days: string[];
  email: string;
  phone: string;
}

interface AlertFormProps {
  initialAlert?: Alert;
  onClose?: () => void;
  onUpdate?: (alert: Alert) => void;
}

const AlertSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Name is required'),
  criteria: Yup.string()
    .oneOf(['Greater', 'Less'], 'Invalid criteria')
    .required('Criteria is required'),
  value: Yup.number()
    .min(0, 'Must be greater than or equal to 0')
    .required('Value is required'),
  days: Yup.array()
    .of(Yup.string())
    .min(1, 'Select at least one day')
    .required('Days are required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  phone: Yup.string()
    .matches(/^[0-9+\-\s()]{8,15}$/, 'Invalid phone number')
    .required('Phone is required'),
});

const AlertForm: React.FC<AlertFormProps> = ({ initialAlert, onClose, onUpdate }) => {
  const isEdit = Boolean(initialAlert);

  const initialValues: AlertFormValues = isEdit && initialAlert
    ? {
        name: initialAlert.name,
        criteria: initialAlert.criteria as 'Greater' | 'Less',
        value: initialAlert.value,
        days: initialAlert.days,
        email: initialAlert.email,
        phone: initialAlert.phone,
      }
    : {
        name: '',
        criteria: 'Greater',
        value: 0,
        days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        email: '',
        phone: '',
      };

  const handleSubmit = async (
    values: AlertFormValues,
    { resetForm, setSubmitting, setStatus }: { resetForm: () => void; setSubmitting: (isSubmitting: boolean) => void; setStatus: (status: { success: boolean; message: string }) => void; }
  ) => {
    try {
      if (isEdit && initialAlert) {
        const res = await api.put(`/alerts/${initialAlert._id}`, values);
        setStatus({ success: true, message: 'Alert updated successfully!' });
        if (onUpdate) onUpdate(res.data);
      } else {
        await api.post('/alerts', values);
        resetForm();
        setStatus({ success: true, message: 'Alert created successfully!' });
        window.dispatchEvent(new CustomEvent('refreshAlerts'));
      }
      if (onClose) onClose();
    } catch {
      setStatus({
        success: false,
        message: 'Failed to submit alert. Please try again.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={AlertSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ isSubmitting, status }) => (
        <Form className="space-y-4">
          {status && status.message && (
            <div
              className={`p-2 text-sm rounded ${
                status.success
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }`}
            >
              {status.message}
            </div>
          )}

          {/* Name Field */}
          <div>
            <Field
              type="text"
              name="name"
              placeholder="Name"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <ErrorMessage
              name="name"
              component="div"
              className="text-red-500 text-xs mt-1"
            />
          </div>

          {/* Criteria Field */}
          <div>
            <div className="flex items-center space-x-4">
              <label className="inline-flex items-center">
                <Field
                  type="radio"
                  name="criteria"
                  value="Greater"
                  className="form-radio h-4 w-4 text-blue-600"
                />
                <span className="ml-2 text-gray-700">Greater than</span>
              </label>
              <label className="inline-flex items-center">
                <Field
                  type="radio"
                  name="criteria"
                  value="Less"
                  className="form-radio h-4 w-4 text-blue-600"
                />
                <span className="ml-2 text-gray-700">Less than</span>
              </label>
            </div>
            <ErrorMessage
              name="criteria"
              component="div"
              className="text-red-500 text-xs mt-1"
            />
          </div>

          {/* Value Field */}
          <div>
            <Field
              type="number"
              name="value"
              placeholder="Value"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <ErrorMessage
              name="value"
              component="div"
              className="text-red-500 text-xs mt-1"
            />
          </div>

          {/* Days Field */}
          <div>
            <div className="relative">
              <Field
                as="select"
                name="days"
                multiple={false}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                onClick={(e: React.MouseEvent<HTMLSelectElement>) => e.preventDefault()}
              >
                <option value="" disabled>
                  Select days
                </option>
                <option value="everyday">Everyday</option>
                <option value="weekdays">Weekdays</option>
                <option value="weekends">Weekends</option>
              </Field>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
            <ErrorMessage
              name="days"
              component="div"
              className="text-red-500 text-xs mt-1"
            />
          </div>

          {/* Criteria Selector */}
          <div>
            <div className="relative">
              <Field
                as="select"
                name="dataSource"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
              >
                <option value="DK-1">DK - 1</option>
                <option value="DK-2">DK - 2</option>
                <option value="DK-Gas">DK - Gas</option>
              </Field>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Email Field */}
          <div>
            <Field
              type="email"
              name="email"
              placeholder="Email"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500 text-xs mt-1"
            />
          </div>

          {/* Phone Field */}
          <div>
            <Field
              type="text"
              name="phone"
              placeholder="Phone"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <ErrorMessage
              name="phone"
              component="div"
              className="text-red-500 text-xs mt-1"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#141B33] text-white py-2 px-8 rounded hover:bg-blue-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AlertForm;