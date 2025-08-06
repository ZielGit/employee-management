<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';

const apiUrl = import.meta.env.VITE_API_URL;
const photoPath = import.meta.env.VITE_PHOTO_URL;
const employees = ref([]);
const modalRef = ref(null);
const modalTitle = ref('');
const EmployeeId = ref(0);
const EmployeeName = ref('');
const DateOfJoining = ref('');
const PhotoFileName = ref('');

onMounted(async () => {
    await fetchEmployees();
});

function addClick() {
    modalTitle.value = "Add Employee";
    EmployeeId.value = 0;
    EmployeeName.value = "";
    DateOfJoining.value = "";
    PhotoFileName.value = "default.png";
    new bootstrap.Modal(modalRef.value).show();
}

function editClick(employee) {
    modalTitle.value = "Edit Employee";
    EmployeeId.value = employee.id;
    EmployeeName.value = employee.EmployeeName;

    const dateOfBirth = new Date(employee.DateOfJoining);
    const year = dateOfBirth.getFullYear();
    const month = (dateOfBirth.getMonth() + 1).toString().padStart(2, '0');
    const day = dateOfBirth.getDate().toString().padStart(2, '0');

    const formattedDateOfBirth = `${year}-${month}-${day}`;
    DateOfJoining.value = formattedDateOfBirth;

    PhotoFileName.value = employee.PhotoFileName;
    new bootstrap.Modal(modalRef.value).show();
}

async function imageUpload(event) {
    try {
        let formData = new FormData();
        formData.append('file', event.target.files[0]);
        const response = await axios.post(`${apiUrl}/employee/save-file`, formData);
        PhotoFileName.value = response.data.file_name
    } catch (error) {
        console.error(error);
    }
}

async function createClick() {
    try {
        await axios.post(`${apiUrl}/employee/create`, {
            EmployeeName: EmployeeName.value,
            DateOfJoining: DateOfJoining.value,
            PhotoFileName: PhotoFileName.value
        });
        await fetchEmployees();
        alert("Employee created successfully");
        const modal = bootstrap.Modal.getInstance(modalRef.value);
        modal.hide();
    } catch (error) {
        console.error(error);
    }
}

async function updateClick() {
    try {
        await axios.put(`${apiUrl}/employee/update/${EmployeeId.value}`, {
            EmployeeName: EmployeeName.value,
            DateOfJoining: DateOfJoining.value,
            PhotoFileName: PhotoFileName.value
        });
        await fetchEmployees();
        alert("Employee updated successfully");
        const modal = bootstrap.Modal.getInstance(modalRef.value);
        modal.hide();
    } catch (error) {
        console.error(error);
    }
}

const fetchEmployees = async () => {
    try {
        const response = await axios.get(`${apiUrl}/employee/list`);
        employees.value = response.data;
    } catch (error) {
        console.error(error);
    }
};

const deleteEmployee = async (id) => {
    try {
        await axios.delete(`${apiUrl}/employee/delete/${id}`);
        await fetchEmployees();
    } catch (error) {
        console.error(error);
    }
};
</script>

<template>
    <div class="container mt-4">
        <button class="btn btn-primary mb-2" @click="addClick()">
            Add Employee
        </button>
        <div class="card">
            <div class="card-header">
                <h1>Employee List</h1>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Name</th>
                                <th scope="col">Date Of Joining</th>
                                <th scope="col">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="employee in employees" :key="employee.id">
                                <td scope="row">{{ employee.id }}</td>
                                <td>{{ employee.EmployeeName }}</td>
                                <td>{{ employee.DateOfJoining }}</td>
                                <td>
                                    <button type="button" class="btn btn-warning me-1" @click="editClick(employee)">
                                        Edit
                                    </button>
                                    <button type="button" class="btn btn-danger" @click="deleteEmployee(employee.id)">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" ref="modalRef">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">{{ modalTitle }}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="input-group mb-3">
                        <span class="input-group-text">Employee Name</span>
                        <input type="text" class="form-control" v-model="EmployeeName">
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text">DOJ</span>
                        <input type="date" class="form-control" v-model="DateOfJoining">
                    </div>
                    <div class="p-2 w-50 bd-highlight">
                        <img width="250px" height="250px" :src="photoPath + '/' + PhotoFileName" />
                        <input class="m-2" type="file" @change="imageUpload">
                    </div>
                    <button type="button" @click="createClick" v-if="EmployeeId == 0" class="btn btn-primary">
                        Create
                    </button>
                    <button type="button" @click="updateClick" v-if="EmployeeId != 0" class="btn btn-primary">
                        Update
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
