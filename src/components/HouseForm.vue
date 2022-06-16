<template>
  <form class="row" action="">
    <div class="col-4">
      <label for="">style</label>
      <input class="form-control" type="text" v-model="houseData.style" />
    </div>
    <div class="col-4">
      <label for="">floors</label>
      <input class="form-control" type="number" v-model="houseData.floors" />
    </div>
    <div class="col-4">
      <label for="">year</label>
      <input class="form-control" type="number" v-model="houseData.year" />
    </div>
    <div class="col-4">
      <label for="">price</label>
      <input class="form-control" type="number" v-model="houseData.price" />
    </div>
    <div class="col-8">
      <label for="">image Url</label>
      <input class="form-control" type="text" v-model="houseData.imgUrl" />
    </div>
    <div class="col-12">
      <label for="">description</label>
      <textarea class="form-control" name="" id="" cols="30" rows="5" v-model="houseData.description"></textarea>
    </div>
    <div class="col-6">
      <label for="">color</label>
      <input class="form-control" type="color" name="" id="" v-model="houseData.color" />
    </div>
    <div class="col-6">
      <button v-if="houseData.id" type="button" class="btn btn-primary" @click="editHouse">
        Edit House
      </button>
      <button v-else type="button" class="btn btn-primary" @click="createHouse">
        Create
      </button>
    </div>
  </form>
</template>


<script>
import { AppState } from "../AppState";
import { computed, reactive, onMounted, ref, watchEffect } from "vue";
import { housesService } from "../services/HousesService";
import { Modal } from "bootstrap";
import Pop from "../utils/Pop";
import { logger } from "../utils/Logger";
export default {
  props: { editHouse: { type: Object, required: false, default: {} } },
  setup(props) {
    const houseData = ref({});
    // NOTE the watcheffect runs when a piece of data inside it changes
    // in this case props.edit house was accessed so if props.edithouse changes it runs again
    watchEffect(() => {
      logger.log(props.editHouse);
      houseData.value = props.editHouse;
    });
    return {
      houseData,
      async createHouse() {
        try {
          logger.log(houseData.value);
          await housesService.createHouse(houseData.value);
          houseData.value = {};
          Modal.getOrCreateInstance(document.getElementById("house-form")).hide();
          Pop.toast("Created House!", "success");
        } catch (error) {
          Pop.toast(error.message, "error");
          logger.error(error);
        }
      },
      async editHouse() {
        try {
          await housesService.editHouse(houseData.value);
          Modal.getOrCreateInstance(
            document.getElementById("edit-house" + houseData.value.id)
          ).hide();
          Pop.toast("Edited House!", "success");
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
