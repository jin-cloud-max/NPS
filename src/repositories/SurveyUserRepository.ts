import { EntityRepository, Repository } from "typeorm";
import SurveyUser from "../entities/SurveyUser";

@EntityRepository(SurveyUser)
class SurveyUserRepository extends Repository<SurveyUser> {}

export default SurveyUserRepository
