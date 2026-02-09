import ProgressBar from "../common/ProgressBar";
import { calcProgress } from "../../utils/progress";

export default function TopicSection({ topic }) {
  const topicQs = topic.subTopicsOrder.flatMap(
    (id) => topic.subTopics[id].questions,
  );

  return (
    <section className="p-4 rounded-xl border mb-6">
      <div className="flex items-center gap-3">
        <h2 className="font-semibold">{topic.name}</h2>
        <ProgressBar value={calcProgress(topicQs)} />
      </div>
    </section>
  );
}
