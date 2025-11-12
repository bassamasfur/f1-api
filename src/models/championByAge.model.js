const { getFirestore, admin } = require('../config/firebase.config');
const FieldValue = admin.firestore.FieldValue;

class ChampionByAgeModel {
  constructor() {
    this.collection = 'champions_by_age';
  }

  async getAll() {
    try {
      const db = getFirestore();
      const snapshot = await db.collection(this.collection).get();
      
      const champions = [];
      snapshot.forEach(doc => {
        champions.push({
          id: doc.id,
          ...doc.data()
        });
      });

      return champions;
    } catch (error) {
      throw new Error(`Error fetching champions by age: ${error.message}`);
    }
  }

  async create(data) {
    try {
      const db = getFirestore();
      const docRef = await db.collection(this.collection).add({
        ...data,
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp()
      });

      const newDoc = await docRef.get();
      return {
        id: newDoc.id,
        ...newDoc.data()
      };
    } catch (error) {
      throw new Error(`Error creating champion by age: ${error.message}`);
    }
  }

  async createMany(champions) {
    try {
      const db = getFirestore();
      const batch = db.batch();
      const results = [];

      champions.forEach(champion => {
        const docRef = db.collection(this.collection).doc();
        batch.set(docRef, {
          ...champion,
          createdAt: FieldValue.serverTimestamp(),
          updatedAt: FieldValue.serverTimestamp()
        });
        results.push({ id: docRef.id, ...champion });
      });

      await batch.commit();
      return results;
    } catch (error) {
      throw new Error(`Error creating multiple champions by age: ${error.message}`);
    }
  }

  async deleteAll() {
    try {
      const db = getFirestore();
      const snapshot = await db.collection(this.collection).get();
      
      if (snapshot.empty) {
        return { deleted: 0 };
      }

      const batch = db.batch();
      snapshot.docs.forEach(doc => {
        batch.delete(doc.ref);
      });

      await batch.commit();
      return { deleted: snapshot.size };
    } catch (error) {
      throw new Error(`Error deleting all champions by age: ${error.message}`);
    }
  }
}

module.exports = new ChampionByAgeModel();
