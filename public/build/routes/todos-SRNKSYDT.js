import "/build/_shared/chunk-ZBGM3ELI.js";
import {
  require_node
} from "/build/_shared/chunk-G7CHZRZX.js";
import {
  Form,
  useFetcher,
  useLoaderData
} from "/build/_shared/chunk-6ROTHZ6Z.js";
import {
  createHotContext
} from "/build/_shared/chunk-A4ZMIUKA.js";
import "/build/_shared/chunk-GIAAE3CH.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-XU7DNSPJ.js";
import {
  require_react
} from "/build/_shared/chunk-BOXFZXVX.js";
import "/build/_shared/chunk-UWV35TSL.js";
import {
  __commonJS,
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// empty-module:../lib/appwrite.server
var require_appwrite = __commonJS({
  "empty-module:../lib/appwrite.server"(exports, module) {
    module.exports = {};
  }
});

// app/routes/todos.tsx
var import_node = __toESM(require_node(), 1);
var import_appwrite2 = __toESM(require_appwrite(), 1);

// app/utils/totdoTree.ts
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/utils/totdoTree.ts"
  );
  import.meta.hot.lastModified = "1770203153477.9353";
}

// app/routes/todos.tsx
var import_react2 = __toESM(require_react(), 1);
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/routes/todos.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
var _s2 = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/routes/todos.tsx"
  );
  import.meta.hot.lastModified = "1770302682299.9373";
}
function TodosPage() {
  _s();
  const {
    todos,
    user
  } = useLoaderData();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
    maxWidth: 800,
    margin: "40px auto",
    padding: "0 20px"
  }, children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 30
    }, children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", { style: {
        margin: 0
      }, children: "Recursive Todos \u{1F504}" }, void 0, false, {
        fileName: "app/routes/todos.tsx",
        lineNumber: 128,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
        fontSize: 14,
        color: "#666"
      }, children: [
        user.email,
        " \xB7 ",
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "/logout", style: {
          color: "#666"
        }, children: "Logout" }, void 0, false, {
          fileName: "app/routes/todos.tsx",
          lineNumber: 137,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/todos.tsx",
        lineNumber: 131,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/todos.tsx",
      lineNumber: 122,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Form, { method: "post", style: {
      marginBottom: 30
    }, children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "intent", value: "create" }, void 0, false, {
        fileName: "app/routes/todos.tsx",
        lineNumber: 147,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
        display: "flex",
        gap: 10
      }, children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", name: "title", placeholder: "Add a new task...", required: true, style: {
          flex: 1,
          padding: "12px 16px",
          fontSize: 16,
          border: "2px solid #e0e0e0",
          borderRadius: 8,
          outline: "none"
        }, onFocus: (e) => e.target.style.borderColor = "#4CAF50", onBlur: (e) => e.target.style.borderColor = "#e0e0e0" }, void 0, false, {
          fileName: "app/routes/todos.tsx",
          lineNumber: 152,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "submit", style: {
          padding: "12px 24px",
          fontSize: 16,
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: 8,
          cursor: "pointer",
          fontWeight: 500
        }, children: "Add Task" }, void 0, false, {
          fileName: "app/routes/todos.tsx",
          lineNumber: 160,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/todos.tsx",
        lineNumber: 148,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/todos.tsx",
      lineNumber: 144,
      columnNumber: 7
    }, this),
    todos.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
      textAlign: "center",
      padding: 60,
      color: "#999",
      fontSize: 18
    }, children: [
      "No tasks yet. Create your first one above! \u{1F3AF}",
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
        fontSize: 14,
        marginTop: 10,
        color: "#bbb"
      }, children: "Tip: You can add sub-tasks to any task!" }, void 0, false, {
        fileName: "app/routes/todos.tsx",
        lineNumber: 183,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/todos.tsx",
      lineNumber: 176,
      columnNumber: 29
    }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TodoListComponent, { todos }, void 0, false, {
      fileName: "app/routes/todos.tsx",
      lineNumber: 190,
      columnNumber: 18
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/todos.tsx",
    lineNumber: 117,
    columnNumber: 10
  }, this);
}
_s(TodosPage, "hXzdl6z7zyHw9FLZd3NrAWg+oOA=", false, function() {
  return [useLoaderData];
});
_c = TodosPage;
function TodoListComponent({
  todos
}) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
    display: "flex",
    flexDirection: "column",
    gap: 8
  }, children: todos.map((todo) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TodoItem, { todo }, todo.$id, false, {
    fileName: "app/routes/todos.tsx",
    lineNumber: 205,
    columnNumber: 26
  }, this)) }, void 0, false, {
    fileName: "app/routes/todos.tsx",
    lineNumber: 200,
    columnNumber: 10
  }, this);
}
_c2 = TodoListComponent;
function TodoItem({
  todo,
  level = 0
}) {
  _s2();
  const fetcher = useFetcher();
  const [showAddSubtask, setShowAddSubtask] = (0, import_react2.useState)(false);
  const [showChildren, setShowChildren] = (0, import_react2.useState)(true);
  const isDeleting = fetcher.formData?.get("todoId") === todo.$id && fetcher.formData?.get("intent") === "delete";
  const isToggling = fetcher.formData?.get("todoId") === todo.$id && fetcher.formData?.get("intent") === "toggle";
  if (isDeleting) {
    return null;
  }
  const completed = isToggling ? !todo.completed : todo.completed;
  const hasChildren = todo.children && todo.children.length > 0;
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
    marginLeft: level * 30
  }, children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "12px 16px",
      backgroundColor: completed ? "#f5f5f5" : "white",
      border: "2px solid #e0e0e0",
      borderRadius: 8,
      transition: "all 0.2s"
    }, children: [
      hasChildren && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { onClick: () => setShowChildren(!showChildren), style: {
        width: 20,
        height: 20,
        border: "none",
        background: "transparent",
        cursor: "pointer",
        fontSize: 14,
        padding: 0,
        color: "#666"
      }, children: showChildren ? "\u25BC" : "\u25B6" }, void 0, false, {
        fileName: "app/routes/todos.tsx",
        lineNumber: 238,
        columnNumber: 25
      }, this),
      !hasChildren && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
        width: 20
      } }, void 0, false, {
        fileName: "app/routes/todos.tsx",
        lineNumber: 252,
        columnNumber: 26
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(fetcher.Form, { method: "post", style: {
        margin: 0
      }, children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "intent", value: "toggle" }, void 0, false, {
          fileName: "app/routes/todos.tsx",
          lineNumber: 260,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "todoId", value: todo.$id }, void 0, false, {
          fileName: "app/routes/todos.tsx",
          lineNumber: 261,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "completed", value: String(todo.completed) }, void 0, false, {
          fileName: "app/routes/todos.tsx",
          lineNumber: 262,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "submit", style: {
          width: 24,
          height: 24,
          border: "2px solid #4CAF50",
          borderRadius: 6,
          backgroundColor: completed ? "#4CAF50" : "white",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 0,
          transition: "all 0.2s"
        }, children: completed && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { style: {
          color: "white",
          fontSize: 16,
          fontWeight: "bold"
        }, children: "\u2713" }, void 0, false, {
          fileName: "app/routes/todos.tsx",
          lineNumber: 276,
          columnNumber: 27
        }, this) }, void 0, false, {
          fileName: "app/routes/todos.tsx",
          lineNumber: 263,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/todos.tsx",
        lineNumber: 257,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { style: {
        flex: 1,
        fontSize: 16,
        textDecoration: completed ? "line-through" : "none",
        color: completed ? "#999" : "#333",
        transition: "all 0.2s"
      }, children: todo.title }, void 0, false, {
        fileName: "app/routes/todos.tsx",
        lineNumber: 285,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { onClick: () => setShowAddSubtask(!showAddSubtask), style: {
        padding: "6px 12px",
        fontSize: 14,
        backgroundColor: "#2196F3",
        color: "white",
        border: "none",
        borderRadius: 6,
        cursor: "pointer",
        transition: "all 0.2s"
      }, onMouseEnter: (e) => e.currentTarget.style.backgroundColor = "#1976D2", onMouseLeave: (e) => e.currentTarget.style.backgroundColor = "#2196F3", children: "+ Sub-task" }, void 0, false, {
        fileName: "app/routes/todos.tsx",
        lineNumber: 296,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(fetcher.Form, { method: "post", style: {
        margin: 0
      }, children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "intent", value: "delete" }, void 0, false, {
          fileName: "app/routes/todos.tsx",
          lineNumber: 313,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "todoId", value: todo.$id }, void 0, false, {
          fileName: "app/routes/todos.tsx",
          lineNumber: 314,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "submit", style: {
          padding: "6px 12px",
          fontSize: 14,
          backgroundColor: "#ff5252",
          color: "white",
          border: "none",
          borderRadius: 6,
          cursor: "pointer",
          transition: "all 0.2s"
        }, onMouseEnter: (e) => e.currentTarget.style.backgroundColor = "#ff1744", onMouseLeave: (e) => e.currentTarget.style.backgroundColor = "#ff5252", children: "Delete" }, void 0, false, {
          fileName: "app/routes/todos.tsx",
          lineNumber: 315,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/todos.tsx",
        lineNumber: 310,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/todos.tsx",
      lineNumber: 227,
      columnNumber: 7
    }, this),
    showAddSubtask && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Form, { method: "post", style: {
      marginTop: 8,
      marginLeft: 50
    }, onSubmit: () => setShowAddSubtask(false), children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "intent", value: "create" }, void 0, false, {
        fileName: "app/routes/todos.tsx",
        lineNumber: 335,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "parentId", value: todo.$id }, void 0, false, {
        fileName: "app/routes/todos.tsx",
        lineNumber: 336,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
        display: "flex",
        gap: 8
      }, children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", name: "title", placeholder: "Add a sub-task...", required: true, autoFocus: true, style: {
          flex: 1,
          padding: "8px 12px",
          fontSize: 14,
          border: "2px solid #2196F3",
          borderRadius: 6,
          outline: "none"
        } }, void 0, false, {
          fileName: "app/routes/todos.tsx",
          lineNumber: 341,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "submit", style: {
          padding: "8px 16px",
          fontSize: 14,
          backgroundColor: "#2196F3",
          color: "white",
          border: "none",
          borderRadius: 6,
          cursor: "pointer"
        }, children: "Add" }, void 0, false, {
          fileName: "app/routes/todos.tsx",
          lineNumber: 349,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "button", onClick: () => setShowAddSubtask(false), style: {
          padding: "8px 16px",
          fontSize: 14,
          backgroundColor: "#999",
          color: "white",
          border: "none",
          borderRadius: 6,
          cursor: "pointer"
        }, children: "Cancel" }, void 0, false, {
          fileName: "app/routes/todos.tsx",
          lineNumber: 360,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/todos.tsx",
        lineNumber: 337,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/todos.tsx",
      lineNumber: 331,
      columnNumber: 26
    }, this),
    showChildren && hasChildren && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
      marginTop: 8
    }, children: todo.children.map((childTodo) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TodoItem, { todo: childTodo, level: level + 1 }, childTodo.$id, false, {
      fileName: "app/routes/todos.tsx",
      lineNumber: 378,
      columnNumber: 43
    }, this)) }, void 0, false, {
      fileName: "app/routes/todos.tsx",
      lineNumber: 375,
      columnNumber: 39
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/todos.tsx",
    lineNumber: 224,
    columnNumber: 10
  }, this);
}
_s2(TodoItem, "Z9ZahAnLAIEe/iKgzkBYKFinh+4=", false, function() {
  return [useFetcher];
});
_c3 = TodoItem;
var _c;
var _c2;
var _c3;
$RefreshReg$(_c, "TodosPage");
$RefreshReg$(_c2, "TodoListComponent");
$RefreshReg$(_c3, "TodoItem");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  TodosPage as default
};
//# sourceMappingURL=/build/routes/todos-SRNKSYDT.js.map
