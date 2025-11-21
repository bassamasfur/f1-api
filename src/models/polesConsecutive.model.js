const { getFirestore } = require('../config/firebase.config');

const db = getFirestore();
const COLLECTION = 'poles_consecutive';

const PolesConsecutiveModel = {
  async addMany(dataArray) {
    const batch = db.batch();
    dataArray.forEach((item) => {
      const docRef = db.collection(COLLECTION).doc();
      batch.set(docRef, item);
    });
    await batch.commit();
    return dataArray.length;
  },

  async getAll() {
    const snapshot = await db.collection(COLLECTION).get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  async clearCollection() {
    const snapshot = await db.collection(COLLECTION).get();
    const batch = db.batch();
    snapshot.docs.forEach(doc => batch.delete(doc.ref));
    await batch.commit();
    return snapshot.size;
  }
};

module.exports = PolesConsecutiveModel;
