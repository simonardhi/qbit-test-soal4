const functions = require('firebase-functions');
const admin = require('firebase-admin');
const app = admin.initializeApp(functions.config().firebase);

exports.addUser = functions.database.ref('/user/${user_id}').onCreate((event) => {
	var username = (event.val().firstname + "" + event.val().lastname).replace(/\s/g, '');
	app.database().ref('/user/${user_id}')
		.orderByChild('username').once('value')
		.then((snapshot) => {
			var ct = 1;
			snapshot.forEach(child => {
				// Cek jika ada yang sama
				if(username.equals(child)){
					// username = username (hasil dari penghapusan spasi) ditambah counter ct sehingga tidak perlu mengulang terus menerus
					username += username + "" + ct;
					ct++;
				}
			});
	});
	/*const newData = {
		firstname: data.firstname,
		lastname: data.lastname,
		email: data.email
	}*/
});