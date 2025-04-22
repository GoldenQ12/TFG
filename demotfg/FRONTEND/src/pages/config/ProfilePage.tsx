import { ChangeEvent, useEffect, useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { Camera } from "lucide-react";


const ProfilePage = () => {


  const {authUser, isUpdatingProfile, updateProfile} = useAuthStore();
  const [selectedImg, setSelectedImg] = useState<string | ArrayBuffer | null>(null);

  const handleImageUpload = async (event : ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;
    const file = files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({profilePic: base64Image});
    }

  }

  const showAuthUser = () => {
    if (authUser) {
      console.log("AuthUser: ", authUser);
    } else {
      return null;
    }
  }

  useEffect(() => {
    showAuthUser();
  })

  return (
    <div className="flex justify-center h-screen pt-20">
      <div className="container">
        <div className=" flex flex-col container rounded-xl gap-4 p-6 space-y-8">

          <div className="text-center">
            <h1 className="text-2xl font-semibold">Perfil</h1>
            <p className="mt-2">Información acerca de tu usuario</p>
          </div>

          {/* avatar upload section  */}

          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={typeof selectedImg === "string" ? selectedImg : authUser?.profilePic || "/avatar.png"}
                alt="Profile"
                className="size-32 rounded-full object-cover border-4 "
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 
                  bg-base-content hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                `}
              >
                <Camera className="w-5 h-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-zinc-400">
              {isUpdatingProfile ? "Actualizando..." : "Haz click sobre el icono de la imagen para cambiar tu avatar"}
            </p>
          </div>


        </div>
          {/* user info section  */}
          <section className="mt-8 flex gap-4 justify-between items-center flex-col">
            <div className="email flex gap-4">
              <h1 className="text-lg font-semibold">Correo electrónico: </h1>
              <h1>{authUser?.email}</h1>
            </div>
            <div className="email flex gap-4">
              <h1 className="text-lg font-semibold">Nombre completo: </h1>
              <h1>{authUser?.fullName}</h1>
            </div>
          </section>
      </div>
    </div>
  )
}

export default ProfilePage
