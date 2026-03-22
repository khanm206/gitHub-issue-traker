const signIn = () => {
  const signInPage = document.getElementById(`signin-page`);
  const otherSections = document.querySelectorAll(`.after-signin`);
  const username = document.getElementById(`username`).value;
  const password = document.getElementById(`password`).value;
  if (username.length == 0 || password.length == 0) {
    alert("Please Enter Both Username & Password!");
    return;
  }
  if (username === `admin` && password === `admin123`) {
    signInPage.classList.add(`hidden`);
    otherSections.forEach((section) => {
      section.classList.remove(`hidden`);
    });
    return;
  } else {
    alert("Username or Password is incorrect!");
  }
};

const activeBtn = (id) => {
  const allButtons = document.querySelectorAll(`.issue-btn`);
  const clickedBtn = document.getElementById(id);
  allButtons.forEach((btn) => {
    btn.classList.remove(`text-white`, `bg-primary`, `border-primary"`);
  });
  clickedBtn.classList.add(`text-white`, `bg-primary`, `border-primary"`);
};

const loadIssue = (id) => {
  activeBtn(id);
  showSpinner(true);
  fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues`)
    .then((res) => res.json())
    .then((data) => {
      let allData = data.data;
      if (id == `btn-all`) {
        showIssue(allData);
      } else if (id == `btn-open`) {
        allData = allData.filter((data) => data.status === "open");
        showIssue(allData);
      } else if (id == `btn-closed`) {
        allData = allData.filter((data) => data.status === "closed");
        showIssue(allData);
      }
    });
};

const showIssue = (allData) => {
  document.getElementById(`issue-number`).innerText = allData.length;
  const allIssueContainer = document.getElementById(`all-issue-container`);
  allIssueContainer.innerHTML = ``;

  for (const data of allData) {
    const div = document.createElement(`div`);
    let priorityHtml = ``;
    if (data.priority == `high`) {
      priorityHtml = `
      <div class="text-base text-center text-red-600 bg-red-400/30 w-fit px-4 py-1 rounded-4xl">
                            HIGH
                        </div>
        `;
    } else if (data.priority == `medium`) {
      priorityHtml = `
                 <div class="text-base text-center text-[#D97706]  bg-[#FFF8DB] w-fit px-4 py-1 rounded-4xl">
                            MEDIUM
                        </div>
        `;
    } else if (data.priority == `low`) {
      priorityHtml = `
                 <div class="text-base text-center text-[#9CA3AF]  bg-[#EEEFF2] w-fit px-4 py-1 rounded-4xl">
                            LOW
                        </div>
        `;
    }

    let statusHtml = ``;
    let statusColor = ``;
    if (data.status == `open`) {
      statusColor = `#00A96E`;
      statusHtml = `
        <img class="w-8" src="./assets/Open-Status.png">
        `;
    } else if (data.status == `closed`) {
      statusColor = `#A855F7`;
      statusHtml = `
        <img class="w-8" src="./assets/Closed- Status .png">
        `;
    }

    let labelHtml = ``;
    for (const label of data.labels) {
      if (label == `bug`) {
        labelHtml += `
             <div class="text-center text-red-600 border
                        border-red-300 bg-red-400/30 w-fit px-4 py-1 rounded-4xl flex items-center gap-1"><i class="fa-solid fa-bug"></i>
                            BUG
                        </div>
            `;
      } else if (label == `help wanted`) {
        labelHtml += `
                 <div class="text-center text-[#D97706] border
                        border-[#FDE68A] bg-[#FFF8DB] w-fit px-4 py-1 rounded-4xl flex items-center gap-1"><i
                                class="fa-regular fa-life-ring"></i>
                            HELP WANTED
                        </div>
                `;
      } else if (label == `enhancement`) {
        labelHtml += `
        <div class="text-center text-[#00A96E] border
                        border-[#BBF7D0] bg-[#DEFCE8] w-fit px-4 py-1 rounded-4xl flex items-center gap-1"><i class="fa-regular fa-star"></i>
                            ENHANCEMENT
                        </div>
        `;
      } else if (label == `documentation`) {
        labelHtml += `
    <div class="text-center text-[#2563EB] border
        border-[#BFDBFE] bg-[#EFF6FF] w-fit px-4 py-1 rounded-4xl flex items-center gap-1">
        <i class="fa-solid fa-book"></i>
        DOCUMENTATION
    </div>
  `;
      } else if (label == `good first issue`) {
        labelHtml += `
    <div class="text-center text-[#7C3AED] border
        border-[#DDD6FE] bg-[#F5F3FF] w-fit px-4 py-1 rounded-4xl flex items-center gap-1">
        <i class="fa-solid fa-seedling"></i>
        GOOD FIRST ISSUE
    </div>
  `;
      }
    }

    div.innerHTML = `
            <div onclick="loadModal(${data.id})"  class="card bg-base-100 w-auto h-full shadow-sm border-t-4 border-t-[${statusColor}]">

                <div class="card-body">
                    <div class="flex justify-between">
                       ${statusHtml}
                       ${priorityHtml}
                    </div>

                    <h2 class="card-title text-xl mt-2">${data.title}</h2>
                    <p class="text-[#64748B] text-base">${data.description}</p>

                    <div class="flex gap-4 mt-2 text-xs">
                       ${labelHtml} 
                    </div>

                    <hr class="my-4 text-black/30">
                    <p class="text-[#64748B] text-base">
                        # by ${data.author}
                        <br>
                        ${data.createdAt.split("T")[0]}
                    </p>

                </div>
            </div>
  `;
    allIssueContainer.append(div);
  }
  showSpinner(false);
};

const loadModal = (id) => {
  showSpinner(true);
  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => showIssueModal(data.data));
};

const showIssueModal = (data) => {
  const issueModal = document.getElementById(`issueModal`);

  let priorityHtml = ``;
  if (data.priority == `high`) {
    priorityHtml = `
      <div class="text-base text-center text-red-600 bg-red-400/30 w-fit px-4 py-1 rounded-4xl">
                            HIGH
                        </div>
        `;
  } else if (data.priority == `medium`) {
    priorityHtml = `
                 <div class="text-base text-center text-[#D97706]  bg-[#FFF8DB] w-fit px-4 py-1 rounded-4xl">
                            MEDIUM
                        </div>
        `;
  } else if (data.priority == `low`) {
    priorityHtml = `
                 <div class="text-base text-center text-[#9CA3AF]  bg-[#EEEFF2] w-fit px-4 py-1 rounded-4xl">
                            LOW
                        </div>
        `;
  }

  let labelHtml = ``;
  for (const label of data.labels) {
    if (label == `bug`) {
      labelHtml += `
             <div class="text-center text-red-600 border
                        border-red-300 bg-red-400/30 w-fit px-4 py-1 rounded-4xl flex items-center gap-1"><i class="fa-solid fa-bug"></i>
                            BUG
                        </div>
            `;
    } else if (label == `help wanted`) {
      labelHtml += `
                 <div class="text-center text-[#D97706] border
                        border-[#FDE68A] bg-[#FFF8DB] w-fit px-4 py-1 rounded-4xl flex items-center gap-1"><i
                                class="fa-regular fa-life-ring"></i>
                            HELP WANTED
                        </div>
                `;
    } else if (label == `enhancement`) {
      labelHtml += `
        <div class="text-center text-[#00A96E] border
                        border-[#BBF7D0] bg-[#DEFCE8] w-fit px-4 py-1 rounded-4xl flex items-center gap-1"><i class="fa-regular fa-star"></i>
                            ENHANCEMENT
                        </div>
        `;
    } else if (label == `documentation`) {
      labelHtml += `
    <div class="text-center text-[#2563EB] border
        border-[#BFDBFE] bg-[#EFF6FF] w-fit px-4 py-1 rounded-4xl flex items-center gap-1">
        <i class="fa-solid fa-book"></i>
        DOCUMENTATION
    </div>
  `;
    } else if (label == `good first issue`) {
      labelHtml += `
    <div class="text-center text-[#7C3AED] border
        border-[#DDD6FE] bg-[#F5F3FF] w-fit px-4 py-1 rounded-4xl flex items-center gap-1">
        <i class="fa-solid fa-seedling"></i>
        GOOD FIRST ISSUE
    </div>
  `;
    }
  }
  let assigneeName = "";
  if (data.assignee) {
    assigneeName = data.assignee
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  } else {
    assigneeName = "None assigned!";
  }

  let statusHtml = "";
  if (data.status == `open`) {
    statusHtml = `<div class="bg-[#00A96E] text-white w-fit px-2 py-1 rounded-3xl">Opned</div>`;
  } else if (data.status == `closed`) {
    statusHtml = `<div class="bg-[#A855F7] text-white w-fit px-2 py-1 rounded-3xl">Closed</div>`;
  }

  issueModal.innerHTML = ``;
  issueModal.innerHTML = `
              <div class="modal-box">
                <h3 class="text-2xl font-bold">${data.title}</h3>
                <div class="md:flex items-center gap-2 mt-2">
                   ${statusHtml}
                    <i class="fa-solid fa-circle fa-2xs" style="color: #64748B;"></i>
                    <div>
                        Opened by ${data.author}
                    </div>
                    <i class="fa-solid fa-circle fa-2xs" style="color: #64748B;"></i>
                    <div>
                       ${data.createdAt.split("T")[0]}
                    </div>
                </div>
                <div class="flex gap-4 text-xs my-6">
                   ${labelHtml}
                </div>
                <p class="pb-4 text-lg">${data.description}</p>
                <div class="bg-[#F8FAFC] flex justify-between p-6 items-center">
                    <div>
                        <span class="text-[#64748B] text-lg">
                            Assignee:
                        </span>

                        <br>
                        <span class="text-xl font-semibold">
                            ${assigneeName}
                        </span>
                    </div>
                    <div class="text-center">

                        <span class="text-[#64748B] text-lg">
                            Priority:
                        </span>

                    ${priorityHtml}

                    </div>
                </div>
                <div class="modal-action">
                    <form method="dialog">
                        <button class="btn btn-primary text-lg">Close</button>
                    </form>
                </div>
            </div>
  `;

  issueModal.showModal();
  showSpinner(false);
};

const showSpinner = (loading) => {
  const spinner = document.getElementById(`spinner`);
  const needLoading = document.querySelectorAll(`.need-loading`);
  if (loading == true) {
    needLoading.forEach((section) => {
      section.classList.add(`hidden`);
    });
    spinner.classList.remove(`hidden`);
  }
  if (loading == false) {
    spinner.classList.add(`hidden`);
    needLoading.forEach((section) => {
      section.classList.remove(`hidden`);
    });
  }
};

loadIssue(`btn-all`);
