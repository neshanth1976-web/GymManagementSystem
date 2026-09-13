const API_URL = "http://localhost:8080/members";
const TRAINER_API_URL = "http://localhost:8080/trainers";
const MEMBERSHIP_PLAN_API_URL = "http://localhost:8080/membership-plans";
const ATTENDANCE_API_URL = "http://localhost:8080/attendance";
const PAYMENT_API_URL = "http://localhost:8080/payments";

let editingPaymentId = null;
let editingMemberId = null;
let editingTrainerId = null;
let editingMembershipPlanId = null;
let editingAttendanceId = null;


// ==================== MEMBER ====================

function addMember() {

    const member = {
        name: document.getElementById("name").value,
        age: Number(document.getElementById("age").value),
        phone: document.getElementById("phone").value,
        weight: Number(document.getElementById("weight").value),
        membershipType: document.getElementById("membershipType").value
    };

    if (editingMemberId !== null) {
        updateMember(member);
        return;
    }

    fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(member)
    })
    .then(response => response.json())
    .then(data => {

        alert("Member added successfully!");

        clearMemberForm();
        loadMembers();

    })
    .catch(error => {
        console.error(error);
        alert("Error adding member!");
    });
}


function loadMembers() {

    fetch(API_URL)
        .then(response => response.json())
        .then(members => {

            const memberList = document.getElementById("memberList");

            memberList.innerHTML = "";

            document.getElementById("totalMembers").innerText = members.length;

            members.forEach(member => {

                const card = document.createElement("div");

                card.className = "member-card";

                card.innerHTML = `
                    <h3>${member.name}</h3>

                    <p><strong>ID:</strong> ${member.id}</p>
                    <p><strong>Age:</strong> ${member.age}</p>
                    <p><strong>Phone:</strong> ${member.phone}</p>
                    <p><strong>Weight:</strong> ${member.weight} kg</p>
                    <p><strong>Membership:</strong> ${member.membershipType}</p>

                    <button onclick="editMember(${member.id})">
                        Edit
                    </button>

                    <button onclick="deleteMember(${member.id})">
                        Delete
                    </button>
                `;

                memberList.appendChild(card);
            });

        })
        .catch(error => {
            console.error(error);
            alert("Error loading members!");
        });
}


function editMember(id) {

    fetch(`${API_URL}/${id}`)
        .then(response => response.json())
        .then(member => {

            document.getElementById("name").value = member.name;
            document.getElementById("age").value = member.age;
            document.getElementById("phone").value = member.phone;
            document.getElementById("weight").value = member.weight;
            document.getElementById("membershipType").value = member.membershipType;

            editingMemberId = id;

            document.querySelector(".form-box h2").innerText = "Edit Member";
            document.querySelector(".form-box button").innerText = "Update Member";

        })
        .catch(error => {
            console.error(error);
            alert("Error loading member!");
        });
}


function updateMember(member) {

    fetch(`${API_URL}/${editingMemberId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(member)
    })
    .then(response => response.json())
    .then(data => {

        alert("Member updated successfully!");

        editingMemberId = null;

        clearMemberForm();

        document.querySelector(".form-box h2").innerText = "Add Member";
        document.querySelector(".form-box button").innerText = "Add Member";

        loadMembers();

    })
    .catch(error => {
        console.error(error);
        alert("Error updating member!");
    });
}


function deleteMember(id) {

    fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    })
    .then(response => response.text())
    .then(data => {

        alert(data);

        loadMembers();

    })
    .catch(error => {
        console.error(error);
        alert("Error deleting member!");
    });
}


function clearMemberForm() {

    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("weight").value = "";
    document.getElementById("membershipType").value = "";
}


// ==================== TRAINER ====================

function addTrainer() {

    const trainer = {
        name: document.getElementById("trainerName").value,
        phone: document.getElementById("trainerPhone").value,
        specialization: document.getElementById("specialization").value,
        trainerType: document.getElementById("trainerType").value,
        shift: document.getElementById("shift").value
    };

    if (editingTrainerId !== null) {
        updateTrainer(trainer);
        return;
    }

    fetch(TRAINER_API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(trainer)
    })
    .then(response => response.json())
    .then(data => {

        alert("Trainer added successfully!");

        clearTrainerForm();
        loadTrainers();

    })
    .catch(error => {
        console.error(error);
        alert("Error adding trainer!");
    });
}


function loadTrainers() {

    fetch(TRAINER_API_URL)
        .then(response => response.json())
        .then(trainers => {

            const trainerList = document.getElementById("trainerList");

            trainerList.innerHTML = "";

            document.getElementById("totalTrainers").innerText = trainers.length;

            trainers.forEach(trainer => {

                const card = document.createElement("div");

                card.className = "member-card";

                card.innerHTML = `
                    <h3>${trainer.name}</h3>

                    <p><strong>ID:</strong> ${trainer.id}</p>
                    <p><strong>Phone:</strong> ${trainer.phone}</p>
                    <p><strong>Specialization:</strong> ${trainer.specialization}</p>
                    <p><strong>Type:</strong> ${trainer.trainerType}</p>
                    <p><strong>Shift:</strong> ${trainer.shift}</p>

                    <button onclick="editTrainer(${trainer.id})">
                        Edit
                    </button>

                    <button onclick="deleteTrainer(${trainer.id})">
                        Delete
                    </button>
                `;

                trainerList.appendChild(card);
            });

        })
        .catch(error => {
            console.error(error);
            alert("Error loading trainers!");
        });
}


function editTrainer(id) {

    fetch(`${TRAINER_API_URL}/${id}`)
        .then(response => response.json())
        .then(trainer => {

            document.getElementById("trainerName").value = trainer.name;
            document.getElementById("trainerPhone").value = trainer.phone;
            document.getElementById("specialization").value = trainer.specialization;
            document.getElementById("trainerType").value = trainer.trainerType;
            document.getElementById("shift").value = trainer.shift;

            editingTrainerId = id;

            document.querySelectorAll(".form-box h2")[1].innerText = "Edit Trainer";
            document.querySelectorAll(".form-box button")[1].innerText = "Update Trainer";

        })
        .catch(error => {
            console.error(error);
            alert("Error loading trainer!");
        });
}


function updateTrainer(trainer) {

    fetch(`${TRAINER_API_URL}/${editingTrainerId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(trainer)
    })
    .then(response => response.json())
    .then(data => {

        alert("Trainer updated successfully!");

        editingTrainerId = null;

        clearTrainerForm();

        document.querySelectorAll(".form-box h2")[1].innerText = "Add Trainer";
        document.querySelectorAll(".form-box button")[1].innerText = "Add Trainer";

        loadTrainers();

    })
    .catch(error => {
        console.error(error);
        alert("Error updating trainer!");
    });
}


function deleteTrainer(id) {

    fetch(`${TRAINER_API_URL}/${id}`, {
        method: "DELETE"
    })
    .then(response => response.text())
    .then(data => {

        alert(data);

        loadTrainers();

    })
    .catch(error => {
        console.error(error);
        alert("Error deleting trainer!");
    });
}


function clearTrainerForm() {

    document.getElementById("trainerName").value = "";
    document.getElementById("trainerPhone").value = "";
    document.getElementById("specialization").value = "";
    document.getElementById("trainerType").value = "";
    document.getElementById("shift").value = "";
}


// ==================== MEMBERSHIP PLAN ====================

function addMembershipPlan() {

    const plan = {
        name: document.getElementById("planName").value,
        duration: Number(document.getElementById("duration").value),
        price: Number(document.getElementById("price").value)
    };

    if (editingMembershipPlanId !== null) {
        updateMembershipPlan(plan);
        return;
    }

    fetch(MEMBERSHIP_PLAN_API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(plan)
    })
    .then(response => response.json())
    .then(data => {

        alert("Membership Plan added successfully!");

        clearMembershipPlanForm();
        loadMembershipPlans();

    })
    .catch(error => {
        console.error(error);
        alert("Error adding Membership Plan!");
    });
}


function loadMembershipPlans() {

    fetch(MEMBERSHIP_PLAN_API_URL)
        .then(response => response.json())
        .then(plans => {

            const planList = document.getElementById("membershipPlanList");

            if (!planList) {
                return;
            }

            planList.innerHTML = "";

            plans.forEach(plan => {

                const card = document.createElement("div");

                card.className = "member-card";

                card.innerHTML = `
                    <h3>${plan.name}</h3>

                    <p><strong>ID:</strong> ${plan.id}</p>
                    <p><strong>Duration:</strong> ${plan.duration} Months</p>
                    <p><strong>Price:</strong> ₹${plan.price}</p>

                    <button onclick="editMembershipPlan(${plan.id})">
                        Edit
                    </button>

                    <button onclick="deleteMembershipPlan(${plan.id})">
                        Delete
                    </button>
                `;

                planList.appendChild(card);
            });

        })
        .catch(error => {
            console.error(error);
            alert("Error loading Membership Plans!");
        });
}


function editMembershipPlan(id) {

    fetch(`${MEMBERSHIP_PLAN_API_URL}/${id}`)
        .then(response => response.json())
        .then(plan => {

            document.getElementById("planName").value = plan.name;
            document.getElementById("duration").value = plan.duration;
            document.getElementById("price").value = plan.price;

            editingMembershipPlanId = id;

            document.getElementById("membershipPlanTitle").innerText =
                "Edit Membership Plan";

            document.getElementById("membershipPlanButton").innerText =
                "Update Plan";

        })
        .catch(error => {
            console.error(error);
            alert("Error loading Membership Plan!");
        });
}


function updateMembershipPlan(plan) {

    fetch(`${MEMBERSHIP_PLAN_API_URL}/${editingMembershipPlanId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(plan)
    })
    .then(response => response.json())
    .then(data => {

        alert("Membership Plan updated successfully!");

        editingMembershipPlanId = null;

        clearMembershipPlanForm();

        document.getElementById("membershipPlanTitle").innerText =
            "Membership Plans";

        document.getElementById("membershipPlanButton").innerText =
            "Add Plan";

        loadMembershipPlans();

    })
    .catch(error => {
        console.error(error);
        alert("Error updating Membership Plan!");
    });
}


function deleteMembershipPlan(id) {

    fetch(`${MEMBERSHIP_PLAN_API_URL}/${id}`, {
        method: "DELETE"
    })
    .then(response => response.text())
    .then(data => {

        alert(data);

        loadMembershipPlans();

    })
    .catch(error => {
        console.error(error);
        alert("Error deleting Membership Plan!");
    });
}


function clearMembershipPlanForm() {

    document.getElementById("planName").value = "";
    document.getElementById("duration").value = "";
    document.getElementById("price").value = "";
}


// ==================== ATTENDANCE ====================

function addAttendance() {

    const attendance = {
        memberId: Number(
            document.getElementById("attendanceMemberId").value
        ),

        date: document.getElementById("attendanceDate").value,

        status: document.getElementById("attendanceStatus").value
    };

    if (editingAttendanceId !== null) {
        updateAttendance(attendance);
        return;
    }

    fetch(ATTENDANCE_API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(attendance)
    })
    .then(response => response.json())
    .then(data => {

        alert("Attendance added successfully!");

        clearAttendanceForm();
        loadAttendance();

    })
    .catch(error => {
        console.error(error);
        alert("Error adding attendance!");
    });
}


function loadAttendance() {

    fetch(ATTENDANCE_API_URL)
        .then(response => response.json())
        .then(attendanceList => {

            const list = document.getElementById("attendanceList");

            if (!list) {
                return;
            }

            list.innerHTML = "";

            attendanceList.forEach(attendance => {

                const card = document.createElement("div");

                card.className = "member-card";

                card.innerHTML = `
                    <h3>Attendance ID: ${attendance.id}</h3>

                    <p>
                        <strong>Member ID:</strong>
                        ${attendance.memberId}
                    </p>

                    <p>
                        <strong>Date:</strong>
                        ${attendance.date}
                    </p>

                    <p>
                        <strong>Status:</strong>
                        ${attendance.status}
                    </p>

                    <button onclick="editAttendance(${attendance.id})">
                        Edit
                    </button>

                    <button onclick="deleteAttendance(${attendance.id})">
                        Delete
                    </button>
                `;

                list.appendChild(card);
            });

        })
        .catch(error => {
            console.error(error);
            alert("Error loading Attendance!");
        });
}


function editAttendance(id) {

    fetch(`${ATTENDANCE_API_URL}/${id}`)
        .then(response => response.json())
        .then(attendance => {

            document.getElementById("attendanceMemberId").value =
                attendance.memberId;

            document.getElementById("attendanceDate").value =
                attendance.date;

            document.getElementById("attendanceStatus").value =
                attendance.status;

            editingAttendanceId = id;

            document.getElementById("attendanceTitle").innerText =
                "Edit Attendance";

            document.getElementById("attendanceButton").innerText =
                "Update Attendance";

        })
        .catch(error => {
            console.error(error);
            alert("Error loading Attendance!");
        });
}


function updateAttendance(attendance) {

    fetch(`${ATTENDANCE_API_URL}/${editingAttendanceId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(attendance)
    })
    .then(response => response.json())
    .then(data => {

        alert("Attendance updated successfully!");

        editingAttendanceId = null;

        clearAttendanceForm();

        document.getElementById("attendanceTitle").innerText =
            "Attendance";

        document.getElementById("attendanceButton").innerText =
            "Mark Attendance";

        loadAttendance();

    })
    .catch(error => {
        console.error(error);
        alert("Error updating Attendance!");
    });
}


function deleteAttendance(id) {

    fetch(`${ATTENDANCE_API_URL}/${id}`, {
        method: "DELETE"
    })
    .then(response => response.text())
    .then(data => {

        alert(data);

        loadAttendance();

    })
    .catch(error => {
        console.error(error);
        alert("Error deleting Attendance!");
    });
}


function clearAttendanceForm() {

    document.getElementById("attendanceMemberId").value = "";
    document.getElementById("attendanceDate").value = "";
    document.getElementById("attendanceStatus").value = "";
}
// ==================== PAYMENT CRUD ====================

async function addPayment() {

    const payment = {
        memberId: Number(document.getElementById("paymentMemberId").value),
        planName: document.getElementById("paymentPlanName").value,
        amount: Number(document.getElementById("paymentAmount").value),
        paymentDate: document.getElementById("paymentDate").value,
        paymentMethod: document.getElementById("paymentMethod").value,
        status: document.getElementById("paymentStatus").value
    };

    try {
        const response = await fetch(PAYMENT_API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payment)
        });

        if (!response.ok) {
            throw new Error("Failed to add payment");
        }

        alert("Payment added successfully!");

        clearPaymentForm();
        loadPayments();

    } catch (error) {
        console.error(error);
        alert("Error adding Payment!");
    }
}


async function loadPayments() {

    try {
        const response = await fetch(PAYMENT_API_URL);

        if (!response.ok) {
            throw new Error("Failed to load payments");
        }

        const payments = await response.json();

        const list = document.getElementById("paymentList");

        list.innerHTML = "";

        payments.forEach(payment => {

            const div = document.createElement("div");

            div.className = "member-card";

            div.innerHTML = `
                <h3>Payment ID: ${payment.id}</h3>

                <p><strong>Member ID:</strong> ${payment.memberId}</p>
                <p><strong>Plan:</strong> ${payment.planName}</p>
                <p><strong>Amount:</strong> ₹${payment.amount}</p>
                <p><strong>Date:</strong> ${payment.paymentDate}</p>
                <p><strong>Method:</strong> ${payment.paymentMethod}</p>
                <p><strong>Status:</strong> ${payment.status}</p>

                <button onclick="editPayment(${payment.id})">
                    Edit
                </button>

                <button onclick="deletePayment(${payment.id})">
                    Delete
                </button>
            `;

            list.appendChild(div);
        });

    } catch (error) {

        console.error(error);
        alert("Error loading Payments!");
    }
}


async function editPayment(id) {

    try {

        const response = await fetch(`${PAYMENT_API_URL}/${id}`);

        if (!response.ok) {
            throw new Error("Payment not found");
        }

        const payment = await response.json();

        document.getElementById("paymentMemberId").value = payment.memberId;
        document.getElementById("paymentPlanName").value = payment.planName;
        document.getElementById("paymentAmount").value = payment.amount;
        document.getElementById("paymentDate").value = payment.paymentDate;
        document.getElementById("paymentMethod").value = payment.paymentMethod;
        document.getElementById("paymentStatus").value = payment.status;

        editingPaymentId = id;

        document.getElementById("paymentButton").innerText =
            "Update Payment";

        document.getElementById("paymentButton").onclick =
            function () {
                updatePayment();
            };

    } catch (error) {

        console.error(error);
        alert("Error loading Payment!");
    }
}


async function updatePayment() {

    const payment = {

        memberId: Number(document.getElementById("paymentMemberId").value),
        planName: document.getElementById("paymentPlanName").value,
        amount: Number(document.getElementById("paymentAmount").value),
        paymentDate: document.getElementById("paymentDate").value,
        paymentMethod: document.getElementById("paymentMethod").value,
        status: document.getElementById("paymentStatus").value
    };

    try {

        const response = await fetch(
            `${PAYMENT_API_URL}/${editingPaymentId}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payment)
            }
        );

        if (!response.ok) {
            throw new Error("Failed to update payment");
        }

        alert("Payment updated successfully!");

        editingPaymentId = null;

        clearPaymentForm();

        document.getElementById("paymentButton").innerText =
            "Add Payment";

        document.getElementById("paymentButton").onclick =
            function () {
                addPayment();
            };

        loadPayments();

    } catch (error) {

        console.error(error);
        alert("Error updating Payment!");
    }
}


async function deletePayment(id) {

    if (!confirm("Are you sure you want to delete this payment?")) {
        return;
    }

    try {

        const response = await fetch(
            `${PAYMENT_API_URL}/${id}`,
            {
                method: "DELETE"
            }
        );

        if (!response.ok) {
            throw new Error("Failed to delete payment");
        }

        alert("Payment deleted successfully!");

        loadPayments();

    } catch (error) {

        console.error(error);
        alert("Error deleting Payment!");
    }
}


function clearPaymentForm() {

    document.getElementById("paymentMemberId").value = "";
    document.getElementById("paymentPlanName").value = "";
    document.getElementById("paymentAmount").value = "";
    document.getElementById("paymentDate").value = "";
    document.getElementById("paymentMethod").value = "";
    document.getElementById("paymentStatus").value = "";
}


// ==================== LOAD DASHBOARD ====================

loadMembers();
loadTrainers();
loadMembershipPlans();
loadAttendance();
loadPayments();