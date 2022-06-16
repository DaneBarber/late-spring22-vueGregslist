<template>
  <form class="row" action="">
    <div class="col-4">
      <label for="">Job</label>
      <input class="form-control" type="text" v-model="jobData.job" />
    </div>
    <div class="col-4">
      <label for="">Contract Length</label>
      <input class="form-control" type="number" v-model="jobData.length" />
    </div>
    <div class="col-4">
      <label for="">Experience</label>
      <input class="form-control" type="number" v-model="jobData.experience" />
    </div>
    <div class="col-4">
      <label for="">Salary</label>
      <input class="form-control" type="number" v-model="jobData.salary" />
    </div>
    <div class="col-12">
      <label for="">description</label>
      <textarea class="form-control" name="" id="" cols="30" rows="5" v-model="jobData.description"></textarea>
    </div>
    <div class="col-6">
      <button v-if="jobData.id" type="button" class="btn btn-primary" @click="editJob">
        Edit Job
      </button>
      <button v-else type="button" class="btn btn-primary" @click="createJob">
        Create
      </button>
    </div>
  </form>
</template>


<script>
import { AppState } from "../AppState";
import { computed, reactive, onMounted, ref, watchEffect } from "vue";
import { jobsService } from "../services/JobsService";
import { Modal } from "bootstrap";
import Pop from "../utils/Pop";
import { logger } from "../utils/Logger";
export default {
  props: { editJob: { type: Object, required: false, default: {} } },
  setup(props) {
    const jobData = ref({});
    // NOTE the watcheffect runs when a piece of data inside it changes
    // in this case props.edit job was accessed so if props.editjob changes it runs again
    watchEffect(() => {
      logger.log(props.editJob);
      jobData.value = props.editJob;
    });
    return {
      jobData,
      async createJob() {
        try {
          logger.log(jobData.value);
          await jobsService.createJob(jobData.value);
          jobData.value = {};
          Modal.getOrCreateInstance(document.getElementById("job-form")).hide();
          Pop.toast("Created Job!", "success");
        } catch (error) {
          Pop.toast(error.message, "error");
          logger.error(error);
        }
      },
      async editJob() {
        try {
          await jobsService.editJob(jobData.value);
          Modal.getOrCreateInstance(
            document.getElementById("edit-job" + jobData.value.id)
          ).hide();
          Pop.toast("Edited Job!", "success");
        } catch (error) {
          Pop.toast(error.message, "error");
          logger.error(error);
        }
      },
    };
  },
};
</script>


<style lang="scss" scoped>
</style>
