const { getFirestore } = require('../config/firebase.config');
const { FieldValue } = require('firebase-admin/firestore');

class ChampionModel {
  constructor() {
    this.collection = 'champions';
  }

  async getAll() {
    try {
      const db = getFirestore();
      const snapshot = await db.collection(this.collection)
        .orderBy('year', 'desc')
        .get();
      
      if (snapshot.empty) {
        return [];
      }

      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      throw new Error(`Error fetching champions: ${error.message}`);
    }
  }

  async getByYear(year) {
    try {
      const db = getFirestore();
      const snapshot = await db.collection(this.collection)
        .where('year', '==', parseInt(year))
        .get();

      if (snapshot.empty) {
        return null;
      }

      const doc = snapshot.docs[0];
      return {
        id: doc.id,
        ...doc.data()
      };
    } catch (error) {
      throw new Error(`Error fetching champion by year: ${error.message}`);
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
      throw new Error(`Error creating champion: ${error.message}`);
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
      throw new Error(`Error creating multiple champions: ${error.message}`);
    }
  }



  async deleteAll() {
    try {
      const db = getFirestore();
      const snapshot = await db.collection(this.collection).get();
      
      const batch = db.batch();
      snapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
      });

      await batch.commit();
      return { deleted: snapshot.size };
    } catch (error) {
      throw new Error(`Error deleting all champions: ${error.message}`);
    }
  }
}

module.exports = new ChampionModel();
