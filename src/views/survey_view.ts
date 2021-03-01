import Survey from "../entities/Survey"

export default {
  render(survey: Survey) {
    return {
      id: survey.id,
      title: survey.title,
      description: survey.description
    }
  },

  renderMany(surveys: Survey[]) {
    return surveys.map(survey => this.render(survey))
  }

}
