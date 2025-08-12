<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';

const apiUrl = import.meta.env.VITE_API_URL;
const departments = ref([]);
const dialog = ref(false)
const confirmationDialog = ref(false)
const modalTitle = ref('');
const DepartmentId = ref(0);
const DepartmentName = ref('');
const departmentToDelete = ref(null);

onMounted(async () => {
    await fetchDepartments();
});

function addClick() {
    modalTitle.value = "Add Department";
    DepartmentId.value = 0;
    DepartmentName.value = "";
    dialog.value = true
}

function editClick(department) {
    modalTitle.value = "Edit Department";
    DepartmentId.value = department.id;
    DepartmentName.value = department.DepartmentName;
    dialog.value = true
}

async function createClick() {
    try {
        await axios.post(`${apiUrl}/employee/create-department`, {
            DepartmentName: DepartmentName.value
        });
        await fetchDepartments();
        alert("Department created successfully");
        dialog.value = false
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
        dialog.value = false
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

const deleteDepartment = async (id) => {
    try {
        await axios.delete(`${apiUrl}/employee/delete-department/${id}`);
        await fetchDepartments();
    } catch (error) {
        console.error(error);
    }
};

function openDeleteDialog(id) {
    departmentToDelete.value = id;
    confirmationDialog.value = true;
}
</script>

<template>
    <v-btn prepend-icon="$plus" color="indigo-accent-4" @click="addClick()">
        Add Department
    </v-btn>

    <h1>Department List</h1>

    <v-table striped="even">
        <thead>
            <tr>
                <th class="text-left">
                    ID
                </th>
                <th class="text-left">
                    Name
                </th>
                <th class="text-left">
                    Actions
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="department in departments" :key="department.id">
                <td>{{ department.id }}</td>
                <td>{{ department.DepartmentName }}</td>
                <td>
                    <v-btn class="ma-2" color="yellow-darken-1" @click="editClick(department)">
                        Edit
                    </v-btn>
                    <v-btn color="red-darken-1" @click="openDeleteDialog(department.id)">
                        Delete
                    </v-btn>
                </td>
            </tr>
        </tbody>
    </v-table>

    <v-dialog v-model="dialog" max-width="500">
        <v-card :title="modalTitle">
            <v-container>
                <v-row>
                    <v-col cols="12">
                        <v-text-field v-model="DepartmentName" label="Department Name" required></v-text-field>
                    </v-col>
                </v-row>
            </v-container>

            <template v-slot:actions>
                <v-btn text="Close" @click="dialog = false">Close</v-btn>

                <v-spacer></v-spacer>

                <v-btn @click="createClick" v-if="DepartmentId == 0">
                    Create
                </v-btn>
                <v-btn @click="updateClick" v-if="DepartmentId != 0">
                    Update
                </v-btn>
            </template>
        </v-card>
    </v-dialog>

    <v-dialog v-model="confirmationDialog" width="auto">
        <v-card max-width="400" text="You won't be able to revert this!." title="Are you sure?">
            <template v-slot:actions>
                <v-btn text="Close" @click="confirmationDialog = false">Cancel</v-btn>
                <v-spacer></v-spacer>
                <v-btn class="ms-auto" text="Yes"
                    @click="deleteDepartment(departmentToDelete); confirmationDialog = false"></v-btn>
            </template>
        </v-card>
    </v-dialog>
</template>
