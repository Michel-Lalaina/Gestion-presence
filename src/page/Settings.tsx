export default function Settings() {
  return (
    <div className="flex flex-col gap-10 w-full min-h-screen">

      {/* TITRE */}
      <h1 className="text-3xl font-bold">Paramètres et Configuration</h1>

      {/* PERSONNALISATION */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold mb-6">Personnalisation</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* Upload Logo */}
          <div>
            <p className="font-medium mb-3">Logo de l’établissement</p>
            <label className="
              border-2 border-dashed border-gray-300 rounded-xl 
              p-6 flex flex-col items-center justify-center text-center 
              cursor-pointer hover:border-green-500 transition
            ">
              <p className="text-gray-500 mb-3">
                Glissez-déposez une image ou cliquez pour la téléverser.
              </p>
              <button className="
                bg-gray-100 px-6 py-2 rounded-full 
                hover:bg-gray-200 transition
              ">
                Téléverser le logo
              </button>
              <input type="file" className="hidden" />
            </label>
          </div>

          {/* Thème couleur */}
          <div>
            <p className="font-medium mb-3">Thème couleur</p>

            <div className="flex gap-3">

              {/* Pastilles couleur */}
              {["#20c997", "#228be6", "#845ef7", "#f08c00"].map((color, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full cursor-pointer border-2"
                  style={{
                    backgroundColor: color,
                    borderColor: i === 0 ? "#20c997" : "transparent",
                  }}
                ></div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* NOTIFICATIONS */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold mb-6">Notifications</h2>

        <div className="flex flex-col gap-6">

          <div className="flex items-center justify-between">
            <p>Recevoir les notifications par e-mail</p>
            <input type="checkbox" className="toggle-switch" />
          </div>

          <div className="flex items-center justify-between">
            <p>Afficher les notifications pop-up dans l'application</p>
            <input type="checkbox" className="toggle-switch" />
          </div>

        </div>
      </section>

      {/* BOUTON DÉCONNEXION */}
      <button className="
        bg-red-500 text-white px-6 py-3 rounded-xl w-60
        flex items-center justify-center gap-2
        hover:bg-red-600 transition
      ">
        <span>⚠️</span> Déconnexion
      </button>
    </div>
  );
}
