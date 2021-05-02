import { gql } from '@apollo/client';


/* Queries */
export const ADD_USER_INFO = gql`mutation AddUserInfo($_eq: String = "", $blood_group: String = "", $district: String = "", $email: String = "", $phone: String = "", $pin_code: String = "", $recovered_on: timestamptz = "", $social_link: String = "", $social_type: String = "", $state: String = "") {
  update_users(where: {user_id: {_eq: $_eq}}, _set: {blood_group: $blood_group, district: $district, email: $email, phone: $phone, pin_code: $pin_code, recovered_on: $recovered_on, social_link: $social_link, social_type: $social_type, state: $state, status: "true"}) {
    affected_rows
  }
}`

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
    users(where: {status: {_eq: "true"}, blood_group: {_in: $blood}, state: {_eq: $state}}) {
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
  }`



/* Mutations */

export const DEACTIVATE_USER = gql`mutation DeactivateUser($user_id: String = "") {
    update_users(where: {user_id: {_eq: $user_id}}, _set: {status: "false"}) {
      affected_rows
    }
  }`