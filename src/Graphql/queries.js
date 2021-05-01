/* Queries */

const CHECK_USER_STATUS = `query CheckUserStatus($user_id: String = "") {
    users(where: {user_id: {_eq: $user_id}}, limit: 1) {
      status
      user_id
      picture
    }
  }`

const GET_ALL_DONOR = `query FetchAllDonors($blood: [String!] = "", $state: String = "") {
    users(where: {status: {_eq: "true"}, blood_group: {_in: $blood}, state: {_eq: $state}}) {
      state
      pin_code
      picture
      name
      id
      district
      blood_group
    }
  }`



/* Mutations */

const DEACTIVATE_USER = `mutation DeactivateUser($user_id: String = "") {
    update_users(where: {user_id: {_eq: $user_id}}, _set: {status: "false"}) {
      affected_rows
    }
  }`