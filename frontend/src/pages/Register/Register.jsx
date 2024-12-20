import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/img/logo.png";
import { useRegister } from "./hooks/useRegister";
import { animated } from "@react-spring/web";
import { useRegisterAnimations } from "./hooks/useRegisterAnimations";
import { usePageTitle } from "../../hooks/usePageTitle";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export const Register = () => {
  const { formData, handleChange, handleSubmit, formErrors, isLoading } =
    useRegister();

  usePageTitle("Регистрация");
  const {
    containerSpring,
    logoSpring,
    setLogoSpring,
    formSpring,
    titleSpring,
  } = useRegisterAnimations();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <animated.div className="login-nav" style={containerSpring}>
      <animated.img
        src={logo}
        alt="Логотип"
        className="logo"
        style={logoSpring}
        onMouseEnter={() => setLogoSpring.start({ scale: 1.05 })}
        onMouseLeave={() => setLogoSpring.start({ scale: 1 })}
      />
      <animated.h1 className="welcome" style={titleSpring}>
        <span className="highlight">Зарегистрируйтесь</span> чтобы начать
      </animated.h1>

      <animated.div className="form-container" style={formSpring}>
        <form className="login" onSubmit={handleSubmit} autoComplete="off">
          <input
            type="text"
            placeholder="Имя пользователя"
            className={`login__input ${formErrors.username ? "warning" : ""}`}
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            placeholder="Email"
            className={`login__input ${formErrors.email ? "warning" : ""}`}
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete="email"
            spellCheck="false"
          />

          <div className="password-field">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Пароль"
              className={`login__input ${formErrors.password ? "warning" : ""}`}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="new-password"
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </button>
          </div>

          <div className="password-field">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Подтвердите пароль"
              className={`login__input ${
                formErrors.confirmPassword ? "warning" : ""
              }`}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              autoComplete="new-password"
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <AiOutlineEye />
              ) : (
                <AiOutlineEyeInvisible />
              )}
            </button>
          </div>

          <div className="form-errors">
            {Object.values(formErrors).filter(Boolean).length > 0 &&
              Object.values(formErrors).map((error, index) => (
                <p key={index} className="error-message">
                  {error}
                </p>
              ))}
          </div>

          <button className="login__btn" type="submit" disabled={isLoading}>
            <span className={`btn-content ${isLoading ? "loading" : ""}`}>
              {isLoading ? (
                <div className="spinner">
                  <div className="bounce1"></div>
                  <div className="bounce2"></div>
                  <div className="bounce3"></div>
                </div>
              ) : (
                "→"
              )}
            </span>
          </button>
        </form>
        <div className="login-footer">
          <Link to="/" className="back-to-main">
            На главную
          </Link>
          <p className="register-link">
            Уже есть аккаунт? <Link to="/login">Войти</Link>
          </p>
        </div>
      </animated.div>
    </animated.div>
  );
};
