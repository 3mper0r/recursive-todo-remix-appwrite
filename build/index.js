var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
};

// app/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});
import { RemixServer } from "@remix-run/react";
import { renderToString } from "react-dom/server";
import { jsxDEV } from "react/jsx-dev-runtime";
function handleRequest(request, statusCode, headers, context) {
  let html = renderToString(
    /* @__PURE__ */ jsxDEV(RemixServer, { context, url: request.url }, void 0, !1, {
      fileName: "app/entry.server.tsx",
      lineNumber: 11,
      columnNumber: 5
    }, this)
  );
  return headers.set("Content-Type", "text/html"), new Response("<!DOCTYPE html>" + html, {
    status: statusCode,
    headers
  });
}

// app/root.tsx
var root_exports = {};
__export(root_exports, {
  default: () => App
});
import { Links, Meta, Outlet, Scripts } from "@remix-run/react";
import { jsxDEV as jsxDEV2 } from "react/jsx-dev-runtime";
function App() {
  return /* @__PURE__ */ jsxDEV2("html", { lang: "en", children: [
    /* @__PURE__ */ jsxDEV2("head", { children: [
      /* @__PURE__ */ jsxDEV2(Meta, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 7,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(Links, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 8,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 6,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV2("body", { children: [
      /* @__PURE__ */ jsxDEV2(Outlet, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 11,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(Scripts, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 12,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 10,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/root.tsx",
    lineNumber: 5,
    columnNumber: 5
  }, this);
}

// app/routes/_index.tsx
var index_exports = {};
__export(index_exports, {
  action: () => action,
  default: () => IndexPage
});
import { useActionData, Form, useNavigation } from "@remix-run/react";
import { redirect, json } from "@remix-run/node";

// app/lib/appwrite-auth.server.ts
async function createAppwriteSession(email, password) {
  console.log("=== Creating session for:", email);
  let response = await fetch("https://cloud.appwrite.io/v1/account/sessions/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Appwrite-Project": "myappwriteprojectid"
    },
    body: JSON.stringify({ email, password })
  });
  if (console.log("Session response status:", response.status), !response.ok) {
    let error = await response.text();
    throw console.error("Session creation failed:", error), new Error("Invalid credentials");
  }
  let fallbackCookiesHeader = response.headers.get("x-fallback-cookies");
  if (fallbackCookiesHeader) {
    console.log("Using x-fallback-cookies header");
    let sessionValue = JSON.parse(fallbackCookiesHeader).a_session_myappwriteprojectid;
    if (sessionValue) {
      let cookie = `a_session_myappwriteprojectid=${sessionValue}; Path=/; HttpOnly; SameSite=Lax`;
      return console.log("Created cookie from fallback:", cookie.substring(0, 100) + "..."), console.log("==="), [cookie];
    }
  }
  let setCookieHeader = response.headers.get("set-cookie");
  if (setCookieHeader) {
    console.log("Parsing set-cookie header");
    let match = setCookieHeader.match(/a_session_myappwriteprojectid=([^;]+)/);
    if (match) {
      let cookie = `a_session_myappwriteprojectid=${match[1]}; Path=/; HttpOnly; SameSite=Lax`;
      return console.log("Created cookie from set-cookie:", cookie.substring(0, 100) + "..."), console.log("==="), [cookie];
    }
  }
  throw console.error("Could not extract session cookie from response"), new Error("Session created but could not extract cookie");
}
async function createAppwriteAccount(email, password, userId) {
  console.log("=== Creating account for:", email);
  let response = await fetch("https://cloud.appwrite.io/v1/account", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Appwrite-Project": "myappwriteprojectid"
    },
    body: JSON.stringify({
      userId,
      email,
      password
    })
  });
  if (console.log("Account creation status:", response.status), !response.ok) {
    let errorText = await response.text();
    console.error("Account creation failed:", errorText);
    let errorMessage = "Account creation failed";
    try {
      errorMessage = JSON.parse(errorText).message || errorMessage;
    } catch {
      errorMessage = errorText || errorMessage;
    }
    throw new Error(errorMessage);
  }
  let accountData = await response.json();
  return console.log("Account created:", accountData.$id), console.log("==="), accountData;
}

// app/routes/_index.tsx
import { jsxDEV as jsxDEV3 } from "react/jsx-dev-runtime";
var action = async ({ request }) => {
  let formData = await request.formData(), email = formData.get("email"), password = formData.get("password");
  console.log("Login attempt for:", email);
  try {
    let sessionCookies = await createAppwriteSession(email, password);
    if (console.log("Session cookies received:", sessionCookies), !sessionCookies || sessionCookies.length === 0)
      return console.error("No session cookies received"), json({ error: "Login failed - no session created" }, { status: 500 });
    console.log("Redirecting to /todos with cookies");
    let headers = new Headers();
    return sessionCookies.forEach((cookie) => {
      headers.append("Set-Cookie", cookie);
    }), redirect("/todos", { headers });
  } catch (error) {
    return console.error("Login error:", error), json({ error: "Invalid email or password" }, { status: 401 });
  }
};
function IndexPage() {
  let actionData = useActionData(), isSubmitting = useNavigation().state === "submitting";
  return /* @__PURE__ */ jsxDEV3("div", { style: { maxWidth: 420, margin: "80px auto", textAlign: "center" }, children: [
    /* @__PURE__ */ jsxDEV3("h1", { children: "Recursive To-Do App" }, void 0, !1, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 44,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV3("p", { children: "Log in to see your todos" }, void 0, !1, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 45,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV3(Form, { method: "post", children: [
      /* @__PURE__ */ jsxDEV3("input", { name: "email", type: "email", required: !0 }, void 0, !1, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 47,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV3("input", { name: "password", type: "password", required: !0 }, void 0, !1, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 48,
        columnNumber: 9
      }, this),
      actionData?.error && /* @__PURE__ */ jsxDEV3("p", { style: { color: "red" }, children: actionData.error }, void 0, !1, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 49,
        columnNumber: 31
      }, this),
      /* @__PURE__ */ jsxDEV3("button", { type: "submit", disabled: isSubmitting, children: isSubmitting ? "Logging in..." : "Log in" }, void 0, !1, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 50,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 46,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV3("p", { children: [
      "No account? ",
      /* @__PURE__ */ jsxDEV3("a", { href: "/signup", children: "Sign up" }, void 0, !1, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 55,
        columnNumber: 21
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 54,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/_index.tsx",
    lineNumber: 43,
    columnNumber: 5
  }, this);
}

// app/routes/logout.tsx
var logout_exports = {};
__export(logout_exports, {
  loader: () => loader
});
import { redirect as redirect2 } from "@remix-run/node";

// app/lib/appwrite.server.ts
import { Client, Account, Databases } from "appwrite";
function createAppwriteServerClient(request) {
  let client = new Client().setEndpoint("https://cloud.appwrite.io/v1").setProject("myappwriteprojectid"), cookie = request.headers.get("cookie") || "";
  return console.log("=== Server client - Incoming cookies:", cookie), cookie && (client.headers.cookie = cookie), {
    client,
    account: new Account(client),
    databases: new Databases(client)
  };
}

// app/routes/logout.tsx
var loader = async ({ request }) => {
  let { account } = createAppwriteServerClient(request);
  try {
    await account.deleteSession("current");
  } catch (error) {
    console.error("Logout error:", error);
  }
  return redirect2("/", {
    headers: {
      "Set-Cookie": "a_session_myappwriteprojectid=; Path=/; HttpOnly; Max-Age=0"
    }
  });
};

// app/routes/signup.tsx
var signup_exports = {};
__export(signup_exports, {
  action: () => action2,
  default: () => SignupPage
});
import { useActionData as useActionData2, Form as Form2, useNavigation as useNavigation2 } from "@remix-run/react";
import { redirect as redirect3, json as json2 } from "@remix-run/node";
import { ID } from "appwrite";
import { jsxDEV as jsxDEV4 } from "react/jsx-dev-runtime";
var action2 = async ({ request }) => {
  console.log("!!! SIGNUP ACTION CALLED !!!");
  try {
    let formData = await request.formData(), email = formData.get("email"), password = formData.get("password");
    if (console.log("Form data:", { email, password: "***" }), !email || !password)
      return json2({ error: "Email and password are required" }, { status: 400 });
    console.log("Step 1: Creating account...");
    try {
      await createAppwriteAccount(email, password, ID.unique()), console.log("Step 2: Account created successfully");
    } catch (accountError) {
      return console.error("Account creation error:", accountError), json2({ error: accountError.message || "Failed to create account" }, { status: 400 });
    }
    console.log("Step 3: Creating session...");
    let sessionCookies;
    try {
      sessionCookies = await createAppwriteSession(email, password), console.log("Step 4: Session created, cookies:", sessionCookies);
    } catch (sessionError) {
      return console.error("Session creation error:", sessionError), json2({ error: sessionError.message || "Account created but login failed" }, { status: 500 });
    }
    if (!sessionCookies || sessionCookies.length === 0)
      return console.error("No session cookies received"), json2({ error: "Login failed - no session" }, { status: 500 });
    console.log("Step 5: Redirecting to /todos");
    let headers = new Headers();
    return sessionCookies.forEach((cookie) => {
      headers.append("Set-Cookie", cookie);
    }), redirect3("/todos", { headers });
  } catch (error) {
    return console.error("Unexpected error in signup action:", error), console.error("Error stack:", error.stack), json2({
      error: error.message || "An unexpected error occurred"
    }, { status: 500 });
  }
};
function SignupPage() {
  let actionData = useActionData2(), isSubmitting = useNavigation2().state === "submitting";
  return /* @__PURE__ */ jsxDEV4("div", { style: { maxWidth: 420, margin: "80px auto", textAlign: "center" }, children: [
    /* @__PURE__ */ jsxDEV4("h1", { children: "Create account" }, void 0, !1, {
      fileName: "app/routes/signup.tsx",
      lineNumber: 73,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV4(Form2, { method: "post", children: [
      /* @__PURE__ */ jsxDEV4("input", { name: "email", type: "email", required: !0, placeholder: "Email" }, void 0, !1, {
        fileName: "app/routes/signup.tsx",
        lineNumber: 75,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV4("br", {}, void 0, !1, {
        fileName: "app/routes/signup.tsx",
        lineNumber: 76,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV4("input", { name: "password", type: "password", required: !0, placeholder: "Password" }, void 0, !1, {
        fileName: "app/routes/signup.tsx",
        lineNumber: 77,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV4("br", {}, void 0, !1, {
        fileName: "app/routes/signup.tsx",
        lineNumber: 78,
        columnNumber: 9
      }, this),
      actionData?.error && /* @__PURE__ */ jsxDEV4("p", { style: { color: "red" }, children: actionData.error }, void 0, !1, {
        fileName: "app/routes/signup.tsx",
        lineNumber: 79,
        columnNumber: 31
      }, this),
      /* @__PURE__ */ jsxDEV4("button", { type: "submit", disabled: isSubmitting, children: isSubmitting ? "Creating account..." : "Sign up" }, void 0, !1, {
        fileName: "app/routes/signup.tsx",
        lineNumber: 80,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/signup.tsx",
      lineNumber: 74,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV4("p", { children: [
      "Already have an account? ",
      /* @__PURE__ */ jsxDEV4("a", { href: "/", children: "Log in" }, void 0, !1, {
        fileName: "app/routes/signup.tsx",
        lineNumber: 85,
        columnNumber: 34
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/signup.tsx",
      lineNumber: 84,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/signup.tsx",
    lineNumber: 72,
    columnNumber: 5
  }, this);
}

// app/routes/todos.tsx
var todos_exports = {};
__export(todos_exports, {
  action: () => action3,
  default: () => TodosPage,
  loader: () => loader2
});
import { useLoaderData, useFetcher, Form as Form3 } from "@remix-run/react";
import { redirect as redirect4, json as json3 } from "@remix-run/node";
import { Query, ID as ID2 } from "appwrite";

// app/utils/totdoTree.ts
function buildTree(todos) {
  let map = /* @__PURE__ */ new Map(), roots = [];
  return todos.forEach(
    (todo) => map.set(todo.$id, { ...todo, children: [] })
  ), map.forEach((todo) => {
    todo.parentId ? map.get(todo.parentId)?.children?.push(todo) : roots.push(todo);
  }), roots;
}
function mapDocumentsToTodos(documents) {
  return documents.map((doc) => ({
    $id: doc.$id,
    title: doc.title,
    completed: doc.completed,
    parentId: doc.parentId || null,
    children: []
  }));
}

// app/routes/todos.tsx
import { useState } from "react";
import { jsxDEV as jsxDEV5 } from "react/jsx-dev-runtime";
var loader2 = async ({ request }) => {
  let { account, databases } = createAppwriteServerClient(request);
  try {
    let user = await account.get(), result = await databases.listDocuments(
      process.env.APPWRITE_DATABASE_ID,
      process.env.APPWRITE_TODOS_COLLECTION_ID,
      [Query.equal("userId", user.$id)]
    ), todos = buildTree(
      mapDocumentsToTodos(result.documents)
    );
    return json3({ todos, user });
  } catch (error) {
    return console.error("Todos loader - auth failed:", error), redirect4("/");
  }
}, action3 = async ({ request }) => {
  let { account, databases } = createAppwriteServerClient(request);
  try {
    let user = await account.get(), formData = await request.formData(), intent = formData.get("intent");
    if (intent === "create") {
      let title = formData.get("title"), parentId = formData.get("parentId");
      return title ? (await databases.createDocument(
        process.env.APPWRITE_DATABASE_ID,
        process.env.APPWRITE_TODOS_COLLECTION_ID,
        ID2.unique(),
        {
          userId: user.$id,
          title,
          completed: !1,
          parentId: parentId || null
        }
      ), json3({ success: !0 })) : json3({ error: "Title is required" }, { status: 400 });
    }
    if (intent === "toggle") {
      let todoId = formData.get("todoId"), completed = formData.get("completed") === "true";
      return await databases.updateDocument(
        process.env.APPWRITE_DATABASE_ID,
        process.env.APPWRITE_TODOS_COLLECTION_ID,
        todoId,
        {
          completed: !completed
        }
      ), json3({ success: !0 });
    }
    if (intent === "delete") {
      let todoId = formData.get("todoId");
      return await databases.deleteDocument(
        process.env.APPWRITE_DATABASE_ID,
        process.env.APPWRITE_TODOS_COLLECTION_ID,
        todoId
      ), json3({ success: !0 });
    }
    return json3({ error: "Invalid intent" }, { status: 400 });
  } catch (error) {
    return console.error("Action error:", error), json3({ error: "Action failed" }, { status: 500 });
  }
};
function TodosPage() {
  let { todos, user } = useLoaderData();
  return /* @__PURE__ */ jsxDEV5("div", { style: { maxWidth: 800, margin: "40px auto", padding: "0 20px" }, children: [
    /* @__PURE__ */ jsxDEV5("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 30 }, children: [
      /* @__PURE__ */ jsxDEV5("h1", { style: { margin: 0 }, children: "Recursive Todos \u{1F504}" }, void 0, !1, {
        fileName: "app/routes/todos.tsx",
        lineNumber: 104,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV5("div", { style: { fontSize: 14, color: "#666" }, children: [
        user.email,
        " \xB7 ",
        /* @__PURE__ */ jsxDEV5("a", { href: "/logout", style: { color: "#666" }, children: "Logout" }, void 0, !1, {
          fileName: "app/routes/todos.tsx",
          lineNumber: 108,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/todos.tsx",
        lineNumber: 105,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/todos.tsx",
      lineNumber: 103,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV5(Form3, { method: "post", style: { marginBottom: 30 }, children: [
      /* @__PURE__ */ jsxDEV5("input", { type: "hidden", name: "intent", value: "create" }, void 0, !1, {
        fileName: "app/routes/todos.tsx",
        lineNumber: 114,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV5("div", { style: { display: "flex", gap: 10 }, children: [
        /* @__PURE__ */ jsxDEV5(
          "input",
          {
            type: "text",
            name: "title",
            placeholder: "Add a new task...",
            required: !0,
            style: {
              flex: 1,
              padding: "12px 16px",
              fontSize: 16,
              border: "2px solid #e0e0e0",
              borderRadius: 8,
              outline: "none"
            },
            onFocus: (e) => e.target.style.borderColor = "#4CAF50",
            onBlur: (e) => e.target.style.borderColor = "#e0e0e0"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/todos.tsx",
            lineNumber: 116,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV5(
          "button",
          {
            type: "submit",
            style: {
              padding: "12px 24px",
              fontSize: 16,
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
              fontWeight: 500
            },
            children: "Add Task"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/todos.tsx",
            lineNumber: 132,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/routes/todos.tsx",
        lineNumber: 115,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/todos.tsx",
      lineNumber: 113,
      columnNumber: 7
    }, this),
    todos.length === 0 ? /* @__PURE__ */ jsxDEV5("div", { style: {
      textAlign: "center",
      padding: 60,
      color: "#999",
      fontSize: 18
    }, children: [
      "No tasks yet. Create your first one above! \u{1F3AF}",
      /* @__PURE__ */ jsxDEV5("div", { style: { fontSize: 14, marginTop: 10, color: "#bbb" }, children: "Tip: You can add sub-tasks to any task!" }, void 0, !1, {
        fileName: "app/routes/todos.tsx",
        lineNumber: 159,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/todos.tsx",
      lineNumber: 152,
      columnNumber: 9
    }, this) : /* @__PURE__ */ jsxDEV5(TodoListComponent, { todos }, void 0, !1, {
      fileName: "app/routes/todos.tsx",
      lineNumber: 164,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/todos.tsx",
    lineNumber: 102,
    columnNumber: 5
  }, this);
}
function TodoListComponent({ todos }) {
  return /* @__PURE__ */ jsxDEV5("div", { style: { display: "flex", flexDirection: "column", gap: 8 }, children: todos.map((todo) => /* @__PURE__ */ jsxDEV5(TodoItem, { todo }, todo.$id, !1, {
    fileName: "app/routes/todos.tsx",
    lineNumber: 174,
    columnNumber: 9
  }, this)) }, void 0, !1, {
    fileName: "app/routes/todos.tsx",
    lineNumber: 172,
    columnNumber: 5
  }, this);
}
function TodoItem({ todo, level = 0 }) {
  let fetcher = useFetcher(), [showAddSubtask, setShowAddSubtask] = useState(!1), [showChildren, setShowChildren] = useState(!0), isDeleting = fetcher.formData?.get("todoId") === todo.$id && fetcher.formData?.get("intent") === "delete", isToggling = fetcher.formData?.get("todoId") === todo.$id && fetcher.formData?.get("intent") === "toggle";
  if (isDeleting)
    return null;
  let completed = isToggling ? !todo.completed : todo.completed, hasChildren = todo.children && todo.children.length > 0;
  return /* @__PURE__ */ jsxDEV5("div", { style: { marginLeft: level * 30 }, children: [
    /* @__PURE__ */ jsxDEV5(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "12px 16px",
          backgroundColor: completed ? "#f5f5f5" : "white",
          border: "2px solid #e0e0e0",
          borderRadius: 8,
          transition: "all 0.2s"
        },
        children: [
          hasChildren && /* @__PURE__ */ jsxDEV5(
            "button",
            {
              onClick: () => setShowChildren(!showChildren),
              style: {
                width: 20,
                height: 20,
                border: "none",
                background: "transparent",
                cursor: "pointer",
                fontSize: 14,
                padding: 0,
                color: "#666"
              },
              children: showChildren ? "\u25BC" : "\u25B6"
            },
            void 0,
            !1,
            {
              fileName: "app/routes/todos.tsx",
              lineNumber: 211,
              columnNumber: 11
            },
            this
          ),
          !hasChildren && /* @__PURE__ */ jsxDEV5("div", { style: { width: 20 } }, void 0, !1, {
            fileName: "app/routes/todos.tsx",
            lineNumber: 229,
            columnNumber: 26
          }, this),
          /* @__PURE__ */ jsxDEV5(fetcher.Form, { method: "post", style: { margin: 0 }, children: [
            /* @__PURE__ */ jsxDEV5("input", { type: "hidden", name: "intent", value: "toggle" }, void 0, !1, {
              fileName: "app/routes/todos.tsx",
              lineNumber: 233,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV5("input", { type: "hidden", name: "todoId", value: todo.$id }, void 0, !1, {
              fileName: "app/routes/todos.tsx",
              lineNumber: 234,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV5("input", { type: "hidden", name: "completed", value: String(todo.completed) }, void 0, !1, {
              fileName: "app/routes/todos.tsx",
              lineNumber: 235,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV5(
              "button",
              {
                type: "submit",
                style: {
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
                },
                children: completed && /* @__PURE__ */ jsxDEV5("span", { style: { color: "white", fontSize: 16, fontWeight: "bold" }, children: "\u2713" }, void 0, !1, {
                  fileName: "app/routes/todos.tsx",
                  lineNumber: 253,
                  columnNumber: 15
                }, this)
              },
              void 0,
              !1,
              {
                fileName: "app/routes/todos.tsx",
                lineNumber: 236,
                columnNumber: 11
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "app/routes/todos.tsx",
            lineNumber: 232,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV5(
            "span",
            {
              style: {
                flex: 1,
                fontSize: 16,
                textDecoration: completed ? "line-through" : "none",
                color: completed ? "#999" : "#333",
                transition: "all 0.2s"
              },
              children: todo.title
            },
            void 0,
            !1,
            {
              fileName: "app/routes/todos.tsx",
              lineNumber: 259,
              columnNumber: 9
            },
            this
          ),
          /* @__PURE__ */ jsxDEV5(
            "button",
            {
              onClick: () => setShowAddSubtask(!showAddSubtask),
              style: {
                padding: "6px 12px",
                fontSize: 14,
                backgroundColor: "#2196F3",
                color: "white",
                border: "none",
                borderRadius: 6,
                cursor: "pointer",
                transition: "all 0.2s"
              },
              onMouseEnter: (e) => e.currentTarget.style.backgroundColor = "#1976D2",
              onMouseLeave: (e) => e.currentTarget.style.backgroundColor = "#2196F3",
              children: "+ Sub-task"
            },
            void 0,
            !1,
            {
              fileName: "app/routes/todos.tsx",
              lineNumber: 272,
              columnNumber: 9
            },
            this
          ),
          /* @__PURE__ */ jsxDEV5(fetcher.Form, { method: "post", style: { margin: 0 }, children: [
            /* @__PURE__ */ jsxDEV5("input", { type: "hidden", name: "intent", value: "delete" }, void 0, !1, {
              fileName: "app/routes/todos.tsx",
              lineNumber: 292,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV5("input", { type: "hidden", name: "todoId", value: todo.$id }, void 0, !1, {
              fileName: "app/routes/todos.tsx",
              lineNumber: 293,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV5(
              "button",
              {
                type: "submit",
                style: {
                  padding: "6px 12px",
                  fontSize: 14,
                  backgroundColor: "#ff5252",
                  color: "white",
                  border: "none",
                  borderRadius: 6,
                  cursor: "pointer",
                  transition: "all 0.2s"
                },
                onMouseEnter: (e) => e.currentTarget.style.backgroundColor = "#ff1744",
                onMouseLeave: (e) => e.currentTarget.style.backgroundColor = "#ff5252",
                children: "Delete"
              },
              void 0,
              !1,
              {
                fileName: "app/routes/todos.tsx",
                lineNumber: 294,
                columnNumber: 11
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "app/routes/todos.tsx",
            lineNumber: 291,
            columnNumber: 9
          }, this)
        ]
      },
      void 0,
      !0,
      {
        fileName: "app/routes/todos.tsx",
        lineNumber: 197,
        columnNumber: 7
      },
      this
    ),
    showAddSubtask && /* @__PURE__ */ jsxDEV5(
      Form3,
      {
        method: "post",
        style: { marginTop: 8, marginLeft: 50 },
        onSubmit: () => setShowAddSubtask(!1),
        children: [
          /* @__PURE__ */ jsxDEV5("input", { type: "hidden", name: "intent", value: "create" }, void 0, !1, {
            fileName: "app/routes/todos.tsx",
            lineNumber: 321,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV5("input", { type: "hidden", name: "parentId", value: todo.$id }, void 0, !1, {
            fileName: "app/routes/todos.tsx",
            lineNumber: 322,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV5("div", { style: { display: "flex", gap: 8 }, children: [
            /* @__PURE__ */ jsxDEV5(
              "input",
              {
                type: "text",
                name: "title",
                placeholder: "Add a sub-task...",
                required: !0,
                autoFocus: !0,
                style: {
                  flex: 1,
                  padding: "8px 12px",
                  fontSize: 14,
                  border: "2px solid #2196F3",
                  borderRadius: 6,
                  outline: "none"
                }
              },
              void 0,
              !1,
              {
                fileName: "app/routes/todos.tsx",
                lineNumber: 324,
                columnNumber: 13
              },
              this
            ),
            /* @__PURE__ */ jsxDEV5(
              "button",
              {
                type: "submit",
                style: {
                  padding: "8px 16px",
                  fontSize: 14,
                  backgroundColor: "#2196F3",
                  color: "white",
                  border: "none",
                  borderRadius: 6,
                  cursor: "pointer"
                },
                children: "Add"
              },
              void 0,
              !1,
              {
                fileName: "app/routes/todos.tsx",
                lineNumber: 339,
                columnNumber: 13
              },
              this
            ),
            /* @__PURE__ */ jsxDEV5(
              "button",
              {
                type: "button",
                onClick: () => setShowAddSubtask(!1),
                style: {
                  padding: "8px 16px",
                  fontSize: 14,
                  backgroundColor: "#999",
                  color: "white",
                  border: "none",
                  borderRadius: 6,
                  cursor: "pointer"
                },
                children: "Cancel"
              },
              void 0,
              !1,
              {
                fileName: "app/routes/todos.tsx",
                lineNumber: 353,
                columnNumber: 13
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "app/routes/todos.tsx",
            lineNumber: 323,
            columnNumber: 11
          }, this)
        ]
      },
      void 0,
      !0,
      {
        fileName: "app/routes/todos.tsx",
        lineNumber: 316,
        columnNumber: 9
      },
      this
    ),
    showChildren && hasChildren && /* @__PURE__ */ jsxDEV5("div", { style: { marginTop: 8 }, children: todo.children.map((childTodo) => /* @__PURE__ */ jsxDEV5(TodoItem, { todo: childTodo, level: level + 1 }, childTodo.$id, !1, {
      fileName: "app/routes/todos.tsx",
      lineNumber: 376,
      columnNumber: 13
    }, this)) }, void 0, !1, {
      fileName: "app/routes/todos.tsx",
      lineNumber: 374,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/todos.tsx",
    lineNumber: 196,
    columnNumber: 5
  }, this);
}

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { entry: { module: "/build/entry.client-JNW74AKI.js", imports: ["/build/_shared/chunk-ZWGWGGVF.js", "/build/_shared/chunk-6ROTHZ6Z.js", "/build/_shared/chunk-A4ZMIUKA.js", "/build/_shared/chunk-GIAAE3CH.js", "/build/_shared/chunk-XU7DNSPJ.js", "/build/_shared/chunk-BOXFZXVX.js", "/build/_shared/chunk-UWV35TSL.js", "/build/_shared/chunk-PNG5AS42.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-6K5BPC2N.js", imports: void 0, hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/_index": { id: "routes/_index", parentId: "root", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/_index-HZQFYBCC.js", imports: ["/build/_shared/chunk-2ACWMAZK.js", "/build/_shared/chunk-G7CHZRZX.js"], hasAction: !0, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/logout": { id: "routes/logout", parentId: "root", path: "logout", index: void 0, caseSensitive: void 0, module: "/build/routes/logout-GGSXPJWV.js", imports: void 0, hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/signup": { id: "routes/signup", parentId: "root", path: "signup", index: void 0, caseSensitive: void 0, module: "/build/routes/signup-JDKR2SRH.js", imports: ["/build/_shared/chunk-2ACWMAZK.js", "/build/_shared/chunk-ZBGM3ELI.js", "/build/_shared/chunk-G7CHZRZX.js"], hasAction: !0, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/todos": { id: "routes/todos", parentId: "root", path: "todos", index: void 0, caseSensitive: void 0, module: "/build/routes/todos-SRNKSYDT.js", imports: ["/build/_shared/chunk-ZBGM3ELI.js", "/build/_shared/chunk-G7CHZRZX.js"], hasAction: !0, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 } }, version: "e230739c", hmr: { runtime: "/build/_shared/chunk-A4ZMIUKA.js", timestamp: 1770303928376 }, url: "/build/manifest-E230739C.js" };

// server-entry-module:@remix-run/dev/server-build
var mode = "development", assetsBuildDirectory = "public/build", future = { v3_fetcherPersist: !1, v3_relativeSplatPath: !1, v3_throwAbortReason: !1 }, publicPath = "/build/", entry = { module: entry_server_exports }, routes = {
  root: {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: index_exports
  },
  "routes/logout": {
    id: "routes/logout",
    parentId: "root",
    path: "logout",
    index: void 0,
    caseSensitive: void 0,
    module: logout_exports
  },
  "routes/signup": {
    id: "routes/signup",
    parentId: "root",
    path: "signup",
    index: void 0,
    caseSensitive: void 0,
    module: signup_exports
  },
  "routes/todos": {
    id: "routes/todos",
    parentId: "root",
    path: "todos",
    index: void 0,
    caseSensitive: void 0,
    module: todos_exports
  }
};
export {
  assets_manifest_default as assets,
  assetsBuildDirectory,
  entry,
  future,
  mode,
  publicPath,
  routes
};
//# sourceMappingURL=index.js.map
