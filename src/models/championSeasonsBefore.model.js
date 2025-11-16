const { getFirestore } = require('../config/firebase.config');

class ChampionSeasonsBeforeModel {
  constructor() {
    this.collectionName = 'champions_seasons_before';
  }

  // Obtener todos los registros
  async getAll() {
    try {
      const db = getFirestore();
      const snapshot = await db.collection(this.collectionName).get();
      
      const records = [];
      snapshot.forEach(doc => {
        records.push({
          id: doc.id,
          ...doc.data()
        });
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
        results.push({
          id: docRef.id,
          ...record
        });
      });

      await batch.commit();
      return results;
    } catch (error) {
      throw new Error(`Error al crear registros: ${error.message}`);
    }
  }

  // Eliminar todos los registros
  async deleteAll() {
    try {
      const db = getFirestore();
      const snapshot = await db.collection(this.collectionName).get();
      
      const batch = db.batch();
      snapshot.docs.forEach(doc => {
        batch.delete(doc.ref);
      });
      
      await batch.commit();
      return { deleted: snapshot.size };
    } catch (error) {
      throw new Error(`Error al eliminar registros: ${error.message}`);
    }
  }
}

module.exports = new ChampionSeasonsBeforeModel();
