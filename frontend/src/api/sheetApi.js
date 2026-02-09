const BASE = "https://interactive-sheet.onrender.com/";

export const sheetApi = {

  async fetchSheet() {
    const res = await fetch(`${BASE}/sheet`);
    return res.json();
  },


  async createTopic(name) {
    const res = await fetch(`${BASE}/topics`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    return res.json();
  },

  async updateTopic(topicId, payload) {
    const res = await fetch(`${BASE}/topics/${topicId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return res.json();
  },

  async deleteTopic(topicId) {
    const res = await fetch(`${BASE}/topics/${topicId}`, {
      method: "DELETE",
    });
    return res.json();
  },


  async createSubTopic(topicId, name) {
    const res = await fetch(`${BASE}/topics/${topicId}/subtopics`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    return res.json();
  },

  async updateSubTopic(topicId, subId, payload) {
    const res = await fetch(
      `${BASE}/topics/${topicId}/subtopics/${subId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      },
    );
    return res.json();
  },

  async deleteSubTopic(topicId, subId) {
    const res = await fetch(
      `${BASE}/topics/${topicId}/subtopics/${subId}`,
      {
        method: "DELETE",
      },
    );
    return res.json();
  },


  async createQuestion(topicId, subId, payload) {
    const res = await fetch(
      `${BASE}/topics/${topicId}/subtopics/${subId}/questions`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      },
    );
    return res.json();
  },

  async toggleQuestion(topicId, subId, qId, done) {
    const res = await fetch(
      `${BASE}/topics/${topicId}/subtopics/${subId}/questions/${qId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ done }),
      },
    );
    return res.json();
  },

  async deleteQuestion(topicId, subId, qId) {
    const res = await fetch(
      `${BASE}/topics/${topicId}/subtopics/${subId}/questions/${qId}`,
      {
        method: "DELETE",
      },
    );
    return res.json();
  },
};
