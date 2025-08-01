import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Logo } from "../svg/Logo";
import HomeSVG from "../svg/HomeSvg";
import ChartPieSVG from "../svg/ChartPieSVG";
import CardSVG from "../svg/CardSVG";
import UserSVG from "../svg/UserSVG";
import SettingsSVG from "../svg/SettingsSVG";
import { useLogoutModalStore } from "../../store/LogoutModalStore";
import NavbarLeftItem from "./NavbarLeftItem";
import { useAuthStore } from "../../store/AuthStore";
import ModalLogout from "../modals/ModalLogout";
import HelpSVG from "../svg/HelpSVG";
import { ROUTES } from "../../routes/routes";


const NavbarLeft = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [urlActive, setUrlActive] = useState("");
    const [open, setOpen] = useState(false);

    const isOpen = useLogoutModalStore((state) => state.isOpen);
    const openModal = useLogoutModalStore((state) => state.openModal);
    const closeModal = useLogoutModalStore((state) => state.closeModal);

    const logout = useAuthStore((state) => state.logout);

    useEffect(() => {
    setUrlActive(location.pathname);
    }, [location.pathname]);

    const handleLogout = () => {
    logout();
    closeModal();
    navigate("/login");
    };

    const itemsNavbar = [
        {
            id: 1,
            title: "Inicio",
            children: <HomeSVG
                viewBox="0 0 24 24"
                width={24}
                height={24}
            />,
            to: ROUTES.DASHBOARD,

        },
        {
            id: 2,
            title: "Historial",
            children: <ChartPieSVG
                viewBox="0 0 24 24"
                width={24}
                height={24}
            />,
            to: ROUTES.HISTORY_TRANSACTION,

        },
        {
            id: 3,
            title: "Billetera",
            children: <CardSVG
                viewBox="0 0 24 24"
                width={24}
                height={24}
            />,
            to: ROUTES.WALLET,
        },
        {
            id: 4,
            title: "Perfil",
            children: <UserSVG
                viewBox="0 0 24 24"
                width={24}
                height={24}
            />,
            to: ROUTES.PROFILE,

        },
        {
            id: 5,
            title: "Ajustes",
            children: <SettingsSVG 
            viewBox="0 0 24 24" 
            width={24} height={24} 
            />,
            action: () => openModal(),
            to: ROUTES.SETTINGS,
        },
    ];

    return (
        <>
            {/* Botón hamburguesa solo visible en pantallas chicas */}
            <button
                className="fixed top-4 left-4 z-50 lg:hidden bg-[var(--color-secondary)] p-2 rounded"
                onClick={() => setOpen(!open)}
                aria-label="Abrir menú lateral"
            >
                <svg width="24" height="24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>
            
            {/* Barra lateral */}

            <div 
                className={`
                    bg-[var(--color-secondary)] fixed left-0 top-0 min-h-screen h-full 
                    w-[70vw] max-w-xs px-4 py-6 flex flex-col items-start z-40
                    transition-transform duration-300
                    ${open ? "translate-x-0" : "-translate-x-full"}
                    lg:translate-x-0 lg:w-[12rem] lg:max-w-xs lg:block
                `}
            >
                {/* Cierra menú en móvil */}
                <button
                    className="lg:hidden self-end mb-4"
                    onClick={() => setOpen(false)}
                    aria-label="Cerrar menú lateral"
                >
                    <svg width="24" height="24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            
            {/* Logo */}'
            <div className="mt-10 w-full flex flex-col items-center">
                <div>
                    <Logo />
                </div>

                <nav className="mt-12 gap-4 flex flex-col items-center w-full text-white font-light">
                    {itemsNavbar.map((item) => (
                        <NavbarLeftItem
                            key={item.id}
                            title={item.title}
                            to={item.to}
                            action={item.action}
                            isActive={item.to ? urlActive === item.to : false}
                        >
                            {item.children}
                        </NavbarLeftItem>
                    ))}
                </nav>
            </div>

            <div className="mt-20 text-white font-light w-full">
                <NavbarLeftItem
                    to={ROUTES.ABOUT}
                    title="Ayuda"
                    isActive={urlActive === ROUTES.ABOUT}
                >
                    {
                        <HelpSVG
                            viewBox="0 0 24 24"
                            height={24}
                            width={24}
                        />
                    }
                </NavbarLeftItem>
            </div>  
        </div>
        {/* Modal */}
            <ModalLogout
                isOpen={isOpen}
                onClose={closeModal}
                onConfirm={handleLogout}
            />
        </>
    );
};

export default NavbarLeft;
