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
	updateDoc
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
		ldrawer: false,
		rdrawer: false,
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
	},
	mutations: {
		TOGGLE_LDRAWER(state) {
			state.ldrawer = !state.ldrawer;
		},
		TOGGLE_RDRAWER(state) {
			state.rdrawer = !state.rdrawer;
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
		}
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
			const { user } = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			return user.uid;
		},
		async Add_User({ commit }, user) {
			const db = getFirestore();
			const collectionRef = collection(db, "usuarios");
			await addDoc(collectionRef, user);
		},
		async Sign_In({ commit }, { email, password }) {
			const auth = getAuth();
			const { user } = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);
			const db = getFirestore();
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
		},
		async Sign_Out({ commit }) {
			const auth = getAuth();
			await signOut(auth);
			commit("SET_USER", null);
			router.push({ name: "login" });
		},
		// FUNCIONES DE CURSOS
		async Add_Course({ commit }, course) {
			const db = getFirestore();
			const collectionRef = collection(db, "cursos");
			const docRef = await addDoc(collectionRef, course);
			await updateDoc(docRef, "uid", docRef.id );
		},
		async Get_Courses({ commit }) {
			const db = getFirestore();
			const collectionRef = collection(db, "cursos");
			const q = query(collectionRef);
			onSnapshot(q, (querySnapshot) => {
				const cursos = [];
				querySnapshot.docs.forEach((doc) => {
					let qCurso = doc.data();

					qCurso.fecha = new Date(
						qCurso.fecha.seconds * 1000
					).toLocaleDateString();

					qCurso.precio = qCurso.precio.toLocaleString("es-CL", {
						style: "currency",
						currency: "CLP",
					});

					qCurso.terminado = qCurso.terminado ? "Si" : "No";

					cursos.push(qCurso);
				});
				commit("SET_CURSOS", cursos);
			});
		},
		async Delete_Course({ commit }, uid) {
			const db = getFirestore();
			const docRef = doc(db, 'cursos', uid);
			confirm("¿Estás seguro de que quieres eliminar este curso?") &&
			await deleteDoc(docRef);
		},
		async Update_Course({ commit }, {uid, fields}) {
			const db = getFirestore();
			const docRef = doc(db, 'cursos', uid);
			await updateDoc(docRef, fields);
		},
	},
	modules: {},
});

export default store