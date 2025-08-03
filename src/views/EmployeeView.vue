<script setup>

</script>

<template>
  <div class="container mt-4">
    <button class="btn btn-primary mb-2">Add Employee</button>
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
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="employee in employees" :key="employee.id">
                            <td scope="row">{{ employee.id }}</td>
                            <td>{{ employee.name }}</td>
                            <td>
                                <!-- <router-link :to="{ name: 'employees.edit', params: { id: employee.id } }" class="btn btn-warning me-1">Edit</router-link> -->
                                <!-- <Button type="button" danger @click="deleteemployee(employee.id)">Delete</Button> -->
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  </div>
</template>
