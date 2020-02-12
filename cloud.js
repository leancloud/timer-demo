const AV = require("leancloud-storage");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(
  "" // 你的 SendGrid API Key
);
AV.Cloud.define("checkTodos", () => {
  const now = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(now.getDate() + 1);
  const todoQuery = new AV.Query("Todo");
  todoQuery
    .greaterThan("due", now)
    .lessThan("due", tomorrow)
    .equalTo("completed", false)
    .ascending("due")
    .find()
    .then(todos => {
      if (todos.length) {
        const msg = {
          to: "", // 接收提醒的邮箱地址
          from: "todo@leancloud.rocks",
          subject: "待办事项",
          html: `<p>亲，别忘了还有这些事情要做：</p>${todos
            .map(
              todo =>
                `<p>${todo.get("title")} ${todo
                  .get("due")
                  .toLocaleString("zh-CN")}</p>`
            )
            .join("")}`
        };
        sgMail.send(msg);
      }
    });
});
