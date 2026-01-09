import React, { useState } from "react";
import { TextField, Button, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import LoginImage from "../assets/terre.png";

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleLogin = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-300 w-screen">
      <div className="bg-white shadow-2xl rounded-3xl flex flex-col md:flex-row overflow-hidden max-w-4xl w-full">

        {/* Left Side - Form */}
        <div className="p-10 md:p-16 flex flex-col justify-center w-full md:w-1/2">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Bienvenue QRP</h2>
          <p className="text-gray-500 mb-10">Cliquez sur le bouton pour continuer en tant que visiteur de l'application</p>
          <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Mot de passe"
              variant="outlined"
              fullWidth
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="button"
              variant="contained"
              color="primary"
              onClick={handleLogin} // <-- redirection directe
              className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-purple-500 hover:to-indigo-500 text-white py-3 rounded-xl transition-all duration-300"
            >
              Visualiser
            </Button>
          </form>
        </div>

        {/* Right Side - Illustration */}
        <div className=" md:block md:w-1/2 bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center">
          <img
            src={LoginImage}
            alt="Login Illustration"
            className="object-cover h-full w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
