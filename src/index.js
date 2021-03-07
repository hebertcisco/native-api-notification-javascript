const requestPermission = () => {
  if (!("Notification" in window)) {
    console.log("Notification API not supported!");
    return;
  }
  const status = document.querySelector("#status");

  Notification.requestPermission(function (result) {
    status.innerText = result;
  });
};
const notify = (title, body) => {
  if (!("Notification" in window) && status.innerText !== "granted") {
    console.log("Notification API not supported or denied!");
    return;
  }

  try {
    new Notification(title, { body });
  } catch (err) {
    console.trace("Notification API error: " + err);
  }
};

const init = () => {
  if (!("Notification" in window)) {
    console.log("Notification API not supported!");
    return;
  }

  const requestPermissionLink = document.querySelector("#request-permission");
  const status = document.querySelector("#status");
  const form = document.querySelector("#form");
  const notifyTitle = document.querySelector("#notify-title");
  const notifyBody = document.querySelector("#notify-body");
  const notifyDatetime = document.querySelector("#notify-datetime");

  status.innerText = Notification.permission;

  requestPermissionLink.addEventListener("click", (e) => {
    e.preventDefault();
    requestPermission();
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = notifyTitle.value;
    const text = notifyBody.value;
    notifyBody.value = "";

    // notify(title, text);

    const date1 = new Date(notifyDatetime.value);
    const date2 = new Date();
    const scheduleDate = date1 - date2;

    setTimeout(() => notify(title, text), scheduleDate);
  });
};

init();
