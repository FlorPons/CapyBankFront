import React, { useState } from "react";
import { useForm, FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { registerSchema, FormDataRegister } from "../schemas/register.schema";

import ModalValidation from "../components/modals/ModalValidation";
import RightSide from "../components/register/RightSide";
import Silueta from "../svgs/silueta.png";
import PersonalSection from "../components/register/PersonalSection";
import NacionalitySection from "../components/register/NacionalitySection";
import PrivateDataSection from "../components/register/PrivateDataSection";
import FooterForm from "../components/register/FooterForm";

const Register: React.FC = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate();

    const { 
        register, 
        handleSubmit, 
        formState: { errors }, 
        control,
    } = useForm<FormDataRegister>({
        resolver: zodResolver(registerSchema),
        mode: "onSubmit"
    });

    // Guarda los datos en localStorage
    const onSubmit = (data: FormDataRegister) => {
        localStorage.setItem("demoUser", JSON.stringify(data));
        setModalOpen(true);
    };

    return (
        <div className="flex min-h-screen">
            {/* Formulario de register */}
            <div className="w-full md:w-6/12 bg-[var(--color-white)] flex items-center justify-center p-8">
            <form
                className="w-full max-w-md flex flex-col gap-4"
                onSubmit={handleSubmit(onSubmit)}
            >
                {/* Logo */}
                <div className="flex justify-center mb-8">
                    <img src={Silueta} alt="Logo" className="w-32 h-32 object-contain" />
                </div>

                <div className="mb-8 text-center">
                    <h4 className="font-monserrat text-black text-2xl md:text-[32px]">
                        <b>Comencemos 👇</b>
                    </h4>
                </div>

                <PersonalSection 
                register={register} 
                errors={errors} 
                control={control} 
                />
                <NacionalitySection 
                register={register} 
                errors={errors} 
                control={control} 
                />
                <PrivateDataSection 
                register={register} 
                errors={errors} 
                control={control} 
                />
                <FooterForm errors={errors as FieldErrors<FormDataRegister>} />
            </form>
            </div>

            {/* Modal de validación */}
            <ModalValidation isOpen={isModalOpen} onClose={() => { setModalOpen(false); navigate("/login"); }} />
            
             {/* Componente de la derecha */}
            <div className="hidden md:flex md:w-6/12 bg-[var(--color-primary)] items-center justify-start">
            <RightSide />
            </div>
        </div>
    );
};

export default Register;