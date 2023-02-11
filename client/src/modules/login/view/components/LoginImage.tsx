import loginImage from 'modules/login/view/assets/login-image.jpg';

export function LoginImage() {

  return (
    <div
      className="login-image full hidden lg:block"
      style={{ backgroundImage: `url(${loginImage})` }}
    />
  );

}
