import SurveyUser from "../entities/SurveyUser"
import userView from "../views/user_view"
import surveyUserView from "../views/survey_view"

export default {
  render(survey_user: SurveyUser) {
    return {
      id: survey_user.id,
      user_id: survey_user.user_id,
      survey_id: survey_user.survey_id,
      value: survey_user.value, 
      user: userView.render(survey_user.user),
      survey: surveyUserView.render(survey_user.survey)
    }
  },

  renderMany(survey_users: SurveyUser[]) {
    return survey_users.map(survey_user => this.render(survey_user))
  }

}
