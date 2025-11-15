const { getFirestore, admin } = require('../config/firebase.config');
const FieldValue = admin.firestore.FieldValue;

class HistoricalPodiumModel {
  constructor() {
    this.collection = 'historical_podium';
  }

  async getAll() {
    try {
      const db = getFirestore();
      const snapshot = await db.collection(this.collection).get();
      
      const podiums = [];
      snapshot.forEach(doc => {
        podiums.push({
          id: doc.id,
          ...doc.data()
        });
      });

      return podiums;
    } catch (error) {
      throw new Error(`Error fetching historical podiums: ${error.message}`);
    }
  }

  async createMany(podiums) {
    try {
      const db = getFirestore();
      const batch = db.batch();
      const results = [];

      podiums.forEach(podium => {
        const docRef = db.collection(this.collection).doc();
        batch.set(docRef, {
          ...podium,
          createdAt: FieldValue.serverTimestamp(),
          updatedAt: FieldValue.serverTimestamp()
        });
        results.push({ id: docRef.id, ...podium });
      });

      await batch.commit();
      return results;
    } catch (error) {
      throw new Error(`Error creating multiple podiums: ${error.message}`);
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
      throw new Error(`Error deleting all podiums: ${error.message}`);
    }
  }
}

module.exports = new HistoricalPodiumModel();
