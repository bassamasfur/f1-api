const { getFirestore } = require('../config/firebase.config');

class VictoriasConsecutivasModel {
  constructor() {
    this.collectionName = 'victorias_consecutivas';
  }

  // Obtener todos los registros
  async getAll() {
    try {
      const db = getFirestore();
      const snapshot = await db.collection(this.collectionName).get();
      const records = [];
      snapshot.forEach(doc => {
        records.push({ id: doc.id, ...doc.data() });
      });
      return records;
    } catch (error) {
      throw new Error(`Error al obtener registros: ${error.message}`);
    }
  }

  // Crear múltiples registros
  async createMany(recordsArray) {
    try {
      const db = getFirestore();
      const batch = db.batch();
      const results = [];
      recordsArray.forEach(record => {
        const docRef = db.collection(this.collectionName).doc();
        batch.set(docRef, record);
        results.push({ id: docRef.id, ...record });
      });
      await batch.commit();
      return results;
    } catch (error) {
      throw new Error(`Error al crear registros: ${error.message}`);
    }
  }

  // Borrar todos los registros
  async deleteAll() {
    try {
      const db = getFirestore();
      const snapshot = await db.collection(this.collectionName).get();
      const batch = db.batch();
      let deleted = 0;
      snapshot.forEach(doc => {
        batch.delete(doc.ref);
        deleted++;
      });
      await batch.commit();
      return { deleted };
    } catch (error) {
      throw new Error(`Error al borrar registros: ${error.message}`);
    }
  }
}

module.exports = new VictoriasConsecutivasModel();
