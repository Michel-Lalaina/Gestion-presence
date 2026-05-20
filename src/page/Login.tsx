

import React, { useState } from "react";
import {
  TextField,
  Button,
  InputAdornment,
  IconButton,
  MenuItem,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import LoginImage from "../assets/images/time-attendance.jpg";

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleLogin = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-400 w-screen">

      <div className="relative bg-white/90 backdrop-blur-xl shadow-2xl rounded-3xl flex flex-col md:flex-row overflow-hidden max-w-5xl w-full">

        {/* LOGO TOP LEFT */}
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">
            QR
          </div>
          <span className="font-semibold text-gray-700">
            QRP Univ
          </span>
        </div>

        {/* LEFT FORM */}
        <div className="p-10 md:p-16 flex flex-col justify-center w-full md:w-1/2">

          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Bienvenue 👋
          </h2>

          <p className="text-gray-500 mb-8 text-sm">
            Connectez-vous pour accéder à votre espace de gestion
          </p>

          <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>

            {/* EMAIL */}
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* PASSWORD */}
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

            {/* ROLE SELECT */}
            <TextField
              select
              label="Rôle"
              fullWidth
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <MenuItem value="admin">Administrateur</MenuItem>
              <MenuItem value="teacher">Enseignant</MenuItem>
              {/* <MenuItem value="student">Étudiant</MenuItem> */}
            </TextField>

            {/* BUTTON */}
            <Button
              type="button"
              variant="contained"
              onClick={handleLogin}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-purple-600 hover:to-indigo-500 text-white py-3 rounded-xl transition-all duration-300 shadow-lg"
            >
              Se connecter
            </Button>

          </form>
        </div>

        {/* RIGHT IMAGE */}
        <div className="hidden md:block md:w-1/2 relative">
          <img
            src={LoginImage}
            alt="Login Illustration"
            className="object-cover h-full w-full"
          />

          {/* overlay premium */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>
      </div>
    </div>
  );
};

export default Login;
