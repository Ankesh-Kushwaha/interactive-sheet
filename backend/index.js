import express from "express";
import cors from "cors";
import crypto from "crypto";

const app = express();
const PORT = 4000;

  app.use(
    cors({
      origin: [
        "http://localhost:5173",
        "https://interactive-sheet.onrender.com",
       " https://interactive-sheet-seven.vercel.app/"
      ],
      credentials: false,
    })
  );

app.use(express.json());

const store = {
  sheet: {
    name: "DSA Sheet",
    description: "Codolio style sheet",
  },
  topicsOrder: [],
  topicsMap: {},
};


const uuid = () => crypto.randomUUID();


app.get("/sheet", (req, res) => {
  res.json({ success: true, data: store });
});


app.post("/topics", (req, res) => {
  const { name } = req.body;
  const id = uuid();

  store.topicsOrder.push(id);
  store.topicsMap[id] = {
    id,
    name,
    collapsed: false,
    subTopicsOrder: [],
    subTopics: {},
  };

  res.json({ success: true, topic: store.topicsMap[id] });
});


app.put("/topics/:topicId", (req, res) => {
  const { topicId } = req.params;
  const { name, collapsed } = req.body;

  const topic = store.topicsMap[topicId];
  if (!topic) return res.status(404).json({ error: "Topic not found" });

  if (name !== undefined) topic.name = name;
  if (collapsed !== undefined) topic.collapsed = collapsed;

  res.json({ success: true, topic });
});

app.delete("/topics/:topicId", (req, res) => {
  const { topicId } = req.params;

  delete store.topicsMap[topicId];
  store.topicsOrder = store.topicsOrder.filter((id) => id !== topicId);

  res.json({ success: true });
});


app.post("/topics/reorder", (req, res) => {
  const { order } = req.body;
  store.topicsOrder = order;
  res.json({ success: true });
});


app.post("/topics/:topicId/subtopics", (req, res) => {
  const { topicId } = req.params;
  const { name } = req.body;

  const topic = store.topicsMap[topicId];
  if (!topic) return res.status(404).json({ error: "Topic not found" });

  const id = uuid();

  topic.subTopicsOrder.push(id);
  topic.subTopics[id] = {
    id,
    name,
    collapsed: false,
    questions: [],
  };

  res.json({ success: true, subTopic: topic.subTopics[id] });
});


app.put("/topics/:topicId/subtopics/:subId", (req, res) => {
  const { topicId, subId } = req.params;
  const { name, collapsed } = req.body;

  const sub = store.topicsMap[topicId]?.subTopics[subId];
  if (!sub) return res.status(404).json({ error: "Subtopic not found" });

  if (name !== undefined) sub.name = name;
  if (collapsed !== undefined) sub.collapsed = collapsed;

  res.json({ success: true, subTopic: sub });
});


app.delete("/topics/:topicId/subtopics/:subId", (req, res) => {
  const topic = store.topicsMap[req.params.topicId];
  if (!topic) return res.status(404).json({ error: "Topic not found" });

  delete topic.subTopics[req.params.subId];
  topic.subTopicsOrder = topic.subTopicsOrder.filter(
    (id) => id !== req.params.subId,
  );

  res.json({ success: true });
});


app.post(
  "/topics/:topicId/subtopics/:subId/questions",
  (req, res) => {
    const { title, detail } = req.body;

    const sub =
      store.topicsMap[req.params.topicId]?.subTopics[req.params.subId];

    if (!sub)
      return res.status(404).json({ error: "Subtopic not found" });

    const q = {
      id: uuid(),
      title,
      detail,
      done: false,
    };

    sub.questions.push(q);

    res.json({ success: true, question: q });
  },
);


app.put(
  "/topics/:topicId/subtopics/:subId/questions/:qId",
  (req, res) => {
    const sub =
      store.topicsMap[req.params.topicId]?.subTopics[req.params.subId];

    if (!sub) return res.status(404).json({ error: "Subtopic not found" });

    const q = sub.questions.find((x) => x.id === req.params.qId);
    if (!q) return res.status(404).json({ error: "Question not found" });

    Object.assign(q, req.body);

    res.json({ success: true, question: q });
  },
);

app.delete(
  "/topics/:topicId/subtopics/:subId/questions/:qId",
  (req, res) => {
    const sub =
      store.topicsMap[req.params.topicId]?.subTopics[req.params.subId];

    if (!sub) return res.status(404).json({ error: "Subtopic not found" });

    sub.questions = sub.questions.filter(
      (q) => q.id !== req.params.qId,
    );

    res.json({ success: true });
  },
);


app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
