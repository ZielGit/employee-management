<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';

const apiUrl = import.meta.env.VITE_API_URL;
const departments = ref([]);
const modalRef = ref(null);
const modalTitle = ref('');
const DepartmentId = ref(0);
const DepartmentName = ref('');

onMounted(async () => {
    await fetchDepartments();
});

function addClick() {
    modalTitle.value = "Add Department";
    DepartmentId.value = 0;
    DepartmentName.value = "";
    new bootstrap.Modal(modalRef.value).show();
}

function editClick(department) {
    modalTitle.value = "Edit Department";
    DepartmentId.value = department.id;
    DepartmentName.value = department.DepartmentName;
    new bootstrap.Modal(modalRef.value).show();
}

async function createClick() {
    try {
        await axios.post(`${apiUrl}/employee/create-department`, {
            DepartmentName: DepartmentName.value
        });
        await fetchDepartments();
        alert("Department created successfully");
        const modal = bootstrap.Modal.getInstance(modalRef.value);
        modal.hide();
    } catch (error) {
        console.error(error);
    }
}

async function updateClick() {
    try {
        await axios.put(`${apiUrl}/employee/update-department/${DepartmentId.value}`, {
            DepartmentName: DepartmentName.value
        });
        await fetchDepartments();
        alert("Department updated successfully");
        const modal = bootstrap.Modal.getInstance(modalRef.value);
        modal.hide();
    } catch (error) {
        console.error(error);
    }
}

const fetchDepartments = async () => {
    try {
        const response = await axios.get(`${apiUrl}/employee/list-departments`);
        departments.value = response.data;
    } catch (error) {
        console.error(error);
    }
};

const deletedepartment = async (id) => {
    try {
        await axios.delete(`${apiUrl}/employee/delete-department/${id}`);
        await fetchDepartments();
    } catch (error) {
        console.error(error);
    }
};
</script>

<template>
    <div class="container mt-4">
        <button class="btn btn-primary mb-2" @click="addClick()">
            Add Department
        </button>
        <div class="card">
            <div class="card-header">
                <h1>Department List</h1>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Name</th>
                                <th scope="col">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="department in departments" :key="department.id">
                                <td scope="row">{{ department.id }}</td>
                                <td>{{ department.DepartmentName }}</td>
                                <td>
                                    <button type="button" class="btn btn-warning me-1" @click="editClick(department)">
                                        Edit
                                    </button>
                                    <button type="button" class="btn btn-danger" @click="deletedepartment(department.id)">
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
                        <span class="input-group-text">Department Name</span>
                        <input type="text" class="form-control" v-model="DepartmentName">
                    </div>

                    <button type="button" @click="createClick" v-if="DepartmentId == 0" class="btn btn-primary">
                        Create
                    </button>
                    <button type="button" @click="updateClick" v-if="DepartmentId != 0" class="btn btn-primary">
                        Update
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
