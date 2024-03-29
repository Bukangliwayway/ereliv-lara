import "./bootstrap";
import "../css/app.css";

import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { Toaster } from "./Components/Toaster";
import { LoadingScreen } from "./Components/LoadingScreen";
import React from "react";
import { useLoadingStore } from "./store";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob("./Pages/**/*.tsx")
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <>
                {/* <LoadingScreen
                    isLoading={useLoadingStore((state) => state.isLoading)}
                /> */}
                <App {...props} />
            </>
        );
    },
    progress: {
        color: "#4B5563",
    },
});
