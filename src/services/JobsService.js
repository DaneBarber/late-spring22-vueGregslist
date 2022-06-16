import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"



class JobsService {
  async getAll() {
    const res = await api.get('api/jobs')
    logger.log('-getJobs-', res.data)
    AppState.jobs = res.data
  }

  async createJob(jobData) {
    const res = await api.post('api/jobs', jobData)
    logger.log('-createJob-', res.data)
    AppState.jobs.push(res.data)
  }

  async editJob(jobData) {
    const res = await api.put('api/jobs/' + jobData.id, jobData)
    logger.log('-editedJob-', res.data)
  }

  async deleteJob(id) {
    const res = await api.delete('api/jobs/' + id)
    logger.log('-deleteJob-', res.data)
    AppState.jobs = AppState.jobs.filter(h => h.id != id)
  }


}

export const jobsService = new JobsService()
