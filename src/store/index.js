import Vue from "vue";
import Vuex from "vuex";
import {
    getFirestore,
    collection,
    addDoc,
    query,
    doc,
    where,
    onSnapshot,
    deleteDoc,
    updateDoc,
} from "firebase/firestore";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import router from "@/router";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        lDrawer: false,
        rDrawer: false,
        dialog: false,
        user: null,
        cursos: [],
        curso: null,
    },
    getters: {
        getUser({ user }) {
            return (
                user || {
                    nombre: "Cursos Alfaweb",
                    email: "Cursos de programación online!",
                    isDummy: true,
                }
            );
        },
        rDrawer: (_) => this.rDrawer,
        lDrawer: (_) => this.lDrawer,
    },
    mutations: {
        TOGGLE_LDRAWER(state) {
            state.lDrawer = !state.lDrawer;
        },
        TOGGLE_RDRAWER(state) {
            state.rDrawer = !state.rDrawer;
        },
        TOGGLE_DIALOG(state) {
            state.dialog = !state.dialog;
        },
        SET_USER(state, user) {
            state.user = user;
        },
        SET_CURSOS(state, cursos) {
            state.cursos = cursos;
        },
        SET_CURSO(state, curso) {
            state.curso = curso;
        },
    },
    actions: {
        // FUNCIONES DE UI
        Toggle_LDrawer({ commit }) {
            commit("TOGGLE_LDRAWER");
        },
        Toggle_RDrawer({ commit }) {
            commit("TOGGLE_RDRAWER");
        },
        Toggle_Dialog({ commit }) {
            commit("TOGGLE_DIALOG");
        },

        // FUNCIONES DE AUTENTICACION
        async Register_User({ commit, dispatch }, { email, password }) {
            const auth = getAuth();

            try {
                const { user } = await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );

                return user.uid;
            } catch (error) {
                console.error("Error creating user.");
                console.error(error);
            }
        },
        async Add_User({ commit }, user) {
            const db = getFirestore();

            try {
                const collectionRef = collection(db, "usuarios");
                await addDoc(collectionRef, user);
            } catch (error) {
                console.error("Error adding User to FireStore");
                console.error(error);
            }
        },
        async Sign_In({ commit }, { email, password }) {
            const auth = getAuth();
            const db = getFirestore();

            try {
                const { user } = await signInWithEmailAndPassword(
                    auth,
                    email,
                    password
                );

                // Podría hacer esto con el email y probablemente debería, pero quería tratar de hacerlo con uid
                const q = query(
                    collection(db, "usuarios"),
                    where("uid", "==", user.uid)
                );

                onSnapshot(q, (querySnapshot) => {
                    querySnapshot.docs.forEach((doc) => {
                        commit("SET_USER", doc.data());
                    });
                });
            } catch (error) {
                console.error("Error signin in with e-mail");
                console.error(error);
            }
        },
        async Sign_Out({ commit }) {
            const auth = getAuth();

            try {
                await signOut(auth);
                commit("SET_USER", null);
                router.push({ name: "login" });
            } catch (error) {
                console.error("Error signing out");
                console.error(error);
            }
        },
        async Get_User({ commit }) {
            const auth = getAuth();
            const db = getFirestore();

            try {
                const { uid } = auth.currentUser;

                const q = query(
                    collection(db, "usuarios"),
                    where("uid", "==", uid)
                );

                onSnapshot(q, (querySnapshot) => {
                    querySnapshot.docs.forEach((doc) => {
                        commit("SET_USER", doc.data());
                    });
                });
            } catch (error) {
                console.error("Error getting user data from database");
                console.error(error);
            }
        },
        // FUNCIONES DE CURSOS
        async Add_Course({ commit }, course) {
            const db = getFirestore();

            try {
                const collectionRef = collection(db, "cursos");
                const docRef = await addDoc(collectionRef, course);
                await updateDoc(docRef, "uid", docRef.id);
            } catch (error) {
                console.error("Error adding course");
                console.error(error);
            }
        },
        async Get_Courses({ commit }) {
            try {
                const db = getFirestore();
                const collectionRef = collection(db, "cursos");
                const q = query(collectionRef);

                onSnapshot(
                    q,
                    (querySnapshot) => {
                        const cursos = [];

                        querySnapshot.docs.forEach((doc) => {
                            let qCurso = doc.data();

                            qCurso.fecha = new Date(
                                qCurso.fecha.seconds * 1000
                            ).toLocaleDateString();

                            qCurso.precio = qCurso.precio.toLocaleString(
                                "es-CL",
                                {
                                    style: "currency",
                                    currency: "CLP",
                                }
                            );

                            qCurso.terminado = qCurso.terminado ? "Si" : "No";

                            cursos.push(qCurso);
                        });
                        commit("SET_CURSOS", cursos);
                    },
                    (error) =>
                        console.log("Error retrieving snapshot data: " + error)
                );
            } catch (error) {
                console.error("Error getting courses from database");
                console.error(error);
            }
        },
        async Delete_Course({ commit }, uid) {
            const db = getFirestore();

            try {
                const docRef = doc(db, "cursos", uid);
                confirm("¿Estás seguro de que quieres eliminar este curso?") &&
                    (await deleteDoc(docRef));
            } catch (error) {
                console.error("Error eliminando curso");
                console.error(error);
            }
        },
        async Update_Course({ commit }, { uid, fields }) {
            const db = getFirestore();

            try {
                const docRef = doc(db, "cursos", uid);
                await updateDoc(docRef, fields);
            } catch (error) {
                console.error("Error updating course data");
                console.error(error);
            }
        },
    },
    modules: {},
});

export default store;
