import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import {
    getDatabase,
    ref,
    get,
    child,
    update,
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyCFqgbA_t3EBVO21nW70umJOHX3UdRr9MY",
    authDomain: "parseit-8021e.firebaseapp.com",
    databaseURL:
        "https://parseit-8021e-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "parseit-8021e",
    storageBucket: "parseit-8021e.appspot.com",
    messagingSenderId: "15166597986",
    appId: "1:15166597986:web:04b0219b1733780ae61a3b",
};
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const dbRef = ref(database);

//variables

//preloads
setScreenSize(window.innerWidth, window.innerHeight);
window.addEventListener("load", function () {
    document.getElementById("home_div").style.display = "flex";
});

//processess

document.getElementById("nav_btn").addEventListener("click", function () {

    showSidebar();
});
document.getElementById("logout_btn").addEventListener("click", function () {
    logout();
});
let startX = 0;
let endX = 0;
document.addEventListener('touchstart', (event) => {
    startX = event.touches[0].clientX;
});
document.addEventListener('touchend', (event) => {
    endX = event.changedTouches[0].clientX;
    // if (endX - startX > 50) {
    //     showSidebar();
    // }
    if (startX - endX > 50) {
        hideSidebar();
        document.getElementById("cluster_div").style.display = "none";

    }
});

//functions
function setScreenSize(width, height) {
    document.body.style.width = width + "px";
    document.body.style.height = height + "px";
    document.documentElement.style.height = height + "px";

}
function showAddStudent() {
    document.getElementById("menu_div").style.display = "none";
    document.getElementById("navbar").style.display = "none";
    document.getElementById("addstudent_div").style.display = "flex";
}
function showAddTeacher() {
    document.getElementById("menu_div").style.display = "none";
    document.getElementById("navbar").style.display = "none";
    document.getElementById("addteacher_div").style.display = "flex";
}
function showAddAdmin() {
    document.getElementById("menu_div").style.display = "none";
    document.getElementById("navbar").style.display = "none";
    document.getElementById("addadmin_div").style.display = "flex";
}
function hideAddStudent() {
    document.getElementById("menu_div").style.display = "block";
    document.getElementById("navbar").style.display = "flex";
    document.getElementById("addstudent_div").style.display = "none";
}
function hideAddTeacher() {
    document.getElementById("menu_div").style.display = "block";
    document.getElementById("navbar").style.display = "flex";
    document.getElementById("addteacher_div").style.display = "none";
}
function hideAddAdmin() {
    document.getElementById("menu_div").style.display = "block";
    document.getElementById("navbar").style.display = "flex";
    document.getElementById("addadmin_div").style.display = "none";
}
function hideHome() {
    document.getElementById("home_div").style.display = "none";
}
function showHome() {
    document.getElementById("home_div").style.display = "flex";
}

function showSidebar() {
    document.getElementById("sidebar_frame").style.animation = "showsidebar 0.3s ease-in-out forwards";
}
function hideSidebar() {
    document.getElementById("sidebar_frame").style.animation = "hidesidebar 0.3s ease-in-out forwards";
}
function getUsernameById(targetId) {
    try {
        return get(child(dbRef, "PARSEIT/username/")).then((snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                const username = Object.keys(data).find(key => data[key] === targetId);
                if (username) {
                    return username;
                } else {
                    console.log("ID not found");
                    return null;
                }
            } else {
                console.log("No data available");
                return null;
            }
        });
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};
function logout() {
    localStorage.removeItem("user-parser-admin");
    window.location.href = "login.html";
}