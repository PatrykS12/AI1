const msg: string = "Hello!";
alert(msg);

interface AppState {
    currentStyle: string;
    styles: { [key: string]: string };
}

const appState: AppState = {
    currentStyle: "css/styl1.css",
    styles: {
        "Styl1": "css/styl1.css",
        "Styl2": "css/styl2.css",
        "Styl3": "css/styl3.css"
    }
};


function changeStyle(styleName: string): void {
    const linkElement = document.querySelector('link[rel="stylesheet"]');
    if (linkElement) {
        const newHref = appState.styles[styleName];
        if (newHref) {
            linkElement.setAttribute("href", newHref);
            appState.currentStyle = newHref;
        } else {
            console.error(`Style ${styleName} not found in appState.`);
        }
    }
}


function createStyleLinks(): void {
    // W tej funkcji znajduje się dynamiczne generowanie linków do styli, 
    // nasłuchiwanie eventu kliknięcia na link 
    const list = document.querySelector(".list");
    if (!list) return;

    
    list.innerHTML = '';

    Object.keys(appState.styles).forEach(styleName => {
        const link = document.createElement("a");
        link.href = "#";
        link.textContent = styleName;
        link.addEventListener("click", (event) => {
            event.preventDefault();
            changeStyle(styleName);
        });

        const listItem = document.createElement("li");
        listItem.appendChild(link);
        list.appendChild(listItem);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    createStyleLinks();
    changeStyle("Styl1"); // Domyślny styl
});


