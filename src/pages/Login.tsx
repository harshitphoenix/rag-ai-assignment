import React, { useCallback, useId, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import CloseButton from 'react-bootstrap/CloseButton';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import { useAuthStore } from '../store/authStore';
import { useAuth } from '../hooks/useAuth';
import './login-bs-modal.css';

function TopoPattern({ patternId }: { patternId: string }) {
  return (
    <svg
      className="position-absolute top-0 start-0 w-100 h-100 text-white opacity-25"
      aria-hidden
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern id={patternId} width="120" height="120" patternUnits="userSpaceOnUse">
          <path
            fill="none"
            stroke="currentColor"
            strokeWidth="0.8"
            d="M0 40 Q30 20 60 40 T120 40 M0 80 Q40 60 80 80 T120 75 M20 0 Q40 30 20 60 T20 120 M80 10 Q100 40 70 70 T90 120"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}

export default function Login() {
  useAuth(false);
  const topoPatternId = useId().replace(/:/g, '');

  const { login, error, loading, clearError } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});

  const tryDismiss = useCallback(() => {
    if (window.history.length > 1) window.history.back();
  }, []);

  const validate = () => {
    const errors: { email?: string; password?: string } = {};
    if (!email) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) errors.email = 'Enter a valid email';
    if (!password) errors.password = 'Password is required';
    else if (password.length < 6) errors.password = 'Minimum 6 characters';
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    await login(email, password);
  };

  return (
    <Modal
      show
      onHide={tryDismiss}
      centered
      scrollable
      backdropClassName="login-bs-backdrop"
      className="login-bs-modal"
      dialogClassName="login-bs-modal-dialog"
      contentClassName="shadow-lg"
      keyboard
      enforceFocus
      restoreFocus
    >
      <Modal.Body className="p-0">
        <Row className="g-0 flex-column flex-md-row">
          <Col md={5} className="login-bs-brand position-relative d-flex flex-column justify-content-between text-white p-4 p-md-5">
            <TopoPattern patternId={topoPatternId} />
            <div className="position-relative" style={{ zIndex: 1 }}>
              <p className="fw-bold fs-5 mb-0 lh-sm">Simple, secure care.</p>
            </div>
            <div className="position-relative d-flex align-items-center gap-2" style={{ zIndex: 1 }}>
              <span className="d-inline-block rounded-1 bg-white opacity-75" style={{ width: '1rem', height: '1rem' }} aria-hidden />
              <span className="fw-bold fs-5" style={{ letterSpacing: '0.04em' }}>EHR</span>
            </div>
          </Col>

          <Col md={7} className="position-relative bg-white">
            <CloseButton
              className="position-absolute top-0 end-0 m-3"
              aria-label="Close"
              onClick={tryDismiss}
            />

            <div className="login-bs-form-col px-4 pt-5 pb-4 px-md-5 pt-md-4 pb-md-5 overflow-auto">
              <h2
                id="login-dialog-title"
                className="text-center fw-bold fs-4 mb-4 login-bs-heading"
              >
                Welcome to HealthOS
              </h2>

              <Button
                variant="outline-secondary"
                disabled
                title="Sign-in with Google is not enabled in this build"
                className="w-100 d-flex align-items-center justify-content-center gap-2 py-3 opacity-75"
              >
                <svg className="flex-shrink-0" width="20" height="20" viewBox="0 0 24 24" aria-hidden>
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </Button>

              <div className="d-flex align-items-center gap-3 my-4">
                <hr className="flex-grow-1 opacity-25 m-0" />
                <span className="small text-secondary text-nowrap">Or</span>
                <hr className="flex-grow-1 opacity-25 m-0" />
              </div>

              {error && (
                <Alert variant="danger" className="py-2 small mb-4" role="alert">
                  {error}
                </Alert>
              )}

              <Form onSubmit={handleSubmit} noValidate>
                <Form.Group className="mb-4" controlId="login-email">
                  <Form.Label visuallyHidden>Your email address</Form.Label>
                  <Form.Control
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      clearError();
                    }}
                    placeholder="Your Email Address"
                    isInvalid={!!fieldErrors.email}
                    className="login-bs-underline"
                  />
                  <Form.Control.Feedback type="invalid">{fieldErrors.email}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4" controlId="login-password">
                  <Form.Label visuallyHidden>Password</Form.Label>
                  <Form.Control
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      clearError();
                    }}
                    placeholder="Password"
                    isInvalid={!!fieldErrors.password}
                    className="login-bs-underline"
                  />
                  <Form.Control.Feedback type="invalid">{fieldErrors.password}</Form.Control.Feedback>
                </Form.Group>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-100 py-3 text-white login-bs-continue border-0"
                >
                  {loading ? 'Signing in…' : 'Continue'}
                </Button>
              </Form>

              <p className="text-center small mt-4 mb-0 px-1 lh-sm login-bs-heading" style={{ fontSize: '0.7rem' }}>
                By proceeding, I agree to{' '}
                <Button variant="link" className="p-0 align-baseline text-decoration-underline login-bs-heading" style={{ fontSize: 'inherit' }}>
                  Terms
                </Button>
                ,{' '}
                <Button variant="link" className="p-0 align-baseline text-decoration-underline login-bs-heading" style={{ fontSize: 'inherit' }}>
                  Privacy Policy
                </Button>
                {' & '}
                <Button variant="link" className="p-0 align-baseline text-decoration-underline login-bs-heading" style={{ fontSize: 'inherit' }}>
                  Data use
                </Button>
                .
              </p>

              <p className="text-center text-muted mt-3 mb-0" style={{ fontSize: '0.65rem' }}>
                Demo: demo@health.com · demo123
              </p>
            </div>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
}
