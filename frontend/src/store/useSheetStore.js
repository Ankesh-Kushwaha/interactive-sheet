import { create } from "zustand";
import { arrayMove } from "@dnd-kit/sortable";
import { sheetApi } from "../api/sheetApi";

const getSavedTheme = () => {
  if (typeof window === "undefined") return "dark";

  return localStorage.getItem("theme") || "dark";
};

const saveTheme = (theme) => {
  localStorage.setItem("theme", theme);
};

export const useSheetStore = create((set, get) => ({

  theme: getSavedTheme(),

  toggleTheme() {
    set((s) => {
      const next = s.theme === "dark" ? "light" : "dark";
      saveTheme(next);
      return { theme: next };
    });
  },


  sheet: {},
  topicsOrder: [],
  topicsMap: {},


  async init() {
    try {
      const res = await sheetApi.fetchSheet();

      set({
        sheet: res.data?.sheet || {},
        topicsOrder: res.data?.topicsOrder || [],
        topicsMap: res.data?.topicsMap || {},
      });
    } catch (err) {
      console.error("Failed to load sheet", err);
    }
  },


  async addTopic(name) {
    const res = await sheetApi.createTopic(name);
    const topic = res.topic;

    set((s) => ({
      topicsOrder: [...s.topicsOrder, topic.id],
      topicsMap: { ...s.topicsMap, [topic.id]: topic },
    }));
  },

  async deleteTopic(topicId) {
    await sheetApi.deleteTopic(topicId);

    set((s) => {
      const { [topicId]: _, ...rest } = s.topicsMap;

      return {
        topicsMap: rest,
        topicsOrder: s.topicsOrder.filter((id) => id !== topicId),
      };
    });
  },

  toggleTopic(topicId) {
    set((s) => ({
      topicsMap: {
        ...s.topicsMap,
        [topicId]: {
          ...s.topicsMap[topicId],
          collapsed: !s.topicsMap[topicId].collapsed,
        },
      },
    }));
  },

  reorderTopics(oldI, newI) {
    set((s) => ({
      topicsOrder: arrayMove(s.topicsOrder, oldI, newI),
    }));
  },


  async addSubTopic(topicId, name) {
    const res = await sheetApi.createSubTopic(topicId, name);
    const sub = res.subTopic;

    set((s) => ({
      topicsMap: {
        ...s.topicsMap,
        [topicId]: {
          ...s.topicsMap[topicId],
          subTopicsOrder: [
            ...s.topicsMap[topicId].subTopicsOrder,
            sub.id,
          ],
          subTopics: {
            ...s.topicsMap[topicId].subTopics,
            [sub.id]: sub,
          },
        },
      },
    }));
  },

  async deleteSubTopic(topicId, subId) {
    await sheetApi.deleteSubTopic(topicId, subId);

    set((s) => {
      const { [subId]: _, ...restSubs } =
        s.topicsMap[topicId].subTopics;

      return {
        topicsMap: {
          ...s.topicsMap,
          [topicId]: {
            ...s.topicsMap[topicId],
            subTopics: restSubs,
            subTopicsOrder: s.topicsMap[
              topicId
            ].subTopicsOrder.filter((id) => id !== subId),
          },
        },
      };
    });
  },

  toggleSubTopic(topicId, subId) {
    set((s) => ({
      topicsMap: {
        ...s.topicsMap,
        [topicId]: {
          ...s.topicsMap[topicId],
          subTopics: {
            ...s.topicsMap[topicId].subTopics,
            [subId]: {
              ...s.topicsMap[topicId].subTopics[subId],
              collapsed:
                !s.topicsMap[topicId].subTopics[subId].collapsed,
            },
          },
        },
      },
    }));
  },

  reorderSubTopics(topicId, oldI, newI) {
    set((s) => ({
      topicsMap: {
        ...s.topicsMap,
        [topicId]: {
          ...s.topicsMap[topicId],
          subTopicsOrder: arrayMove(
            s.topicsMap[topicId].subTopicsOrder,
            oldI,
            newI
          ),
        },
      },
    }));
  },


  async addQuestion(topicId, subId, payload) {
    const res = await sheetApi.createQuestion(topicId, subId, payload);
    const q = res.question;

    set((s) => ({
      topicsMap: {
        ...s.topicsMap,
        [topicId]: {
          ...s.topicsMap[topicId],
          subTopics: {
            ...s.topicsMap[topicId].subTopics,
            [subId]: {
              ...s.topicsMap[topicId].subTopics[subId],
              questions: [
                ...s.topicsMap[topicId].subTopics[subId].questions,
                q,
              ],
            },
          },
        },
      },
    }));
  },

  async toggleQuestion(topicId, subId, qId) {
    const q =
      get().topicsMap[topicId].subTopics[subId].questions.find(
        (x) => x.id === qId
      );

    await sheetApi.toggleQuestion(topicId, subId, qId, !q.done);

    set((s) => ({
      topicsMap: {
        ...s.topicsMap,
        [topicId]: {
          ...s.topicsMap[topicId],
          subTopics: {
            ...s.topicsMap[topicId].subTopics,
            [subId]: {
              ...s.topicsMap[topicId].subTopics[subId],
              questions: s.topicsMap[topicId].subTopics[
                subId
              ].questions.map((x) =>
                x.id === qId ? { ...x, done: !x.done } : x
              ),
            },
          },
        },
      },
    }));
  },

  async deleteQuestion(topicId, subId, qId) {
    await sheetApi.deleteQuestion(topicId, subId, qId);

    set((s) => ({
      topicsMap: {
        ...s.topicsMap,
        [topicId]: {
          ...s.topicsMap[topicId],
          subTopics: {
            ...s.topicsMap[topicId].subTopics,
            [subId]: {
              ...s.topicsMap[topicId].subTopics[subId],
              questions: s.topicsMap[topicId].subTopics[
                subId
              ].questions.filter((q) => q.id !== qId),
            },
          },
        },
      },
    }));
  },

  reorderQuestions(topicId, subId, oldI, newI) {
    set((s) => ({
      topicsMap: {
        ...s.topicsMap,
        [topicId]: {
          ...s.topicsMap[topicId],
          subTopics: {
            ...s.topicsMap[topicId].subTopics,
            [subId]: {
              ...s.topicsMap[topicId].subTopics[subId],
              questions: arrayMove(
                s.topicsMap[topicId].subTopics[subId].questions,
                oldI,
                newI
              ),
            },
          },
        },
      },
    }));
  },
}));
