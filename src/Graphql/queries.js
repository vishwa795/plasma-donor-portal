import { gql } from '@apollo/client';


/* Queries */


export const GET_USER_DETAILS = gql`query getDonorByAuth0Id($auth0Id: String!) {
  users(where: {user_id: {_eq: $auth0Id}}) {
    blood_group
    district
    email
    email_count
    id
    name
    phone
    picture
    pin_code
    recovered_on
    social_link
    social_type
    state
    status
    user_id
    updated_at
    social_link
    social_type
  }
}`

export const CHECK_USER_STATUS = gql`query CheckUserStatus($user_id: String = "") {
    users(where: {user_id: {_eq: $user_id}}, limit: 1) {
      status
      user_id
      picture
    }
  }`

export const GET_ALL_DONOR = gql`query FetchAllDonors($blood: [String!] = "", $state: String = "") {
  users(where: {status: {_eq: "true"}, blood_group: {_in: $blood}, state: {_eq: $state}}, order_by: {email_count: asc}) {
    user_id
    state
    pin_code
    picture
    name
    id
    district
    blood_group
    recovered_on
    updated_at
  }
}
`



/* Mutations */
export const ADD_USER_INFO = gql`mutation AddUserInfo($_eq: String = "",$name: String!, $blood_group: String = "", $district: String = "", $phone: String = "", $pin_code: String = "", $recovered_on: date , $social_link: String = "", $social_type: String = "", $state: String = "") {
  update_users(where: {user_id: {_eq: $_eq}}, _set: {name:$name,blood_group: $blood_group, district: $district, phone: $phone, pin_code: $pin_code, recovered_on: $recovered_on, social_link: $social_link, social_type: $social_type, state: $state, status: "true"}) {
    affected_rows
  }
}`


export const DEACTIVATE_USER = gql`mutation DeactivateUser($user_id: String!) {
    update_users(where: {user_id: {_eq: $user_id}}, _set: {status: "onboarding"}) {
      affected_rows 
    }
  }`

export const ADD_NEW_REQUEST = gql`mutation MyMutation($donor_id: Int = 10, $req_email: String = "", $req_hospital: String = "", $req_hospital_address: String = "", $req_hospital_district: String = "", $req_hospital_pin_code: String = "", $req_hospital_state: String = "", $req_message: String = "", $req_name: String = "", $req_phone: String = "",$req_blood_group: String = "") {
  insert_requests(objects: {donor_id: $donor_id, req_email: $req_email, req_hospital: $req_hospital, req_hospital_address: $req_hospital_address, req_hospital_district: $req_hospital_district, req_hospital_pin_code: $req_hospital_pin_code, req_hospital_state: $req_hospital_state, req_message: $req_message, req_name: $req_name, req_phone: $req_phone,req_blood_group: $req_blood_group}) {
    affected_rows
  }
}
`