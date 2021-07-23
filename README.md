<h1>Apollo Auth Api</h1>

<h3>The headers must be included:</h3>
<ul>
    <li>
        <h4>accept</h4>
        <ul>
            <li>The value is "accept-request"</li>
        </ul>
    </li>
    <li>
        <h4>csrf-token</div>
        <ul>
            <li>You can get the value from /csrf-token. Also there will leave a cookie with the key "csrf-token"</li>
        </ul>
    </li>
</ul>

<h3>The graphql doc:</h3>

<pre>
    type User{
        id: ID,
        username: String,
        email: String,
        admin: Boolean,
        confirmed: Boolean,
        pictureUrl: String
    }
    type AuthPayload{
        user: User,
        refreshToken: String
    }
    extend type Query {
        getUser(id: ID!): User,
        isLoggedIn(accessToken: String,ip: String): User,
        isValidForgotPasswordToken(forgotPasswordToken: String!): Boolean,
    }
    extend type Mutation {
        register(username: String!, email: String!, password: String!): Boolean,
        login(email: String!, password: String!): AuthPayload,
        confirmUser(token: String!): Boolean,
        forgotPassword(email: String!): Boolean,
        resetPassword(token: String!,newPassword: String!): Boolean,
        logout: Boolean,
        logoutAll: Boolean,
        updateUserInfo(
            refreshToken: String
            username: String,
            password: String,
            file: Upload
        ): User,
    } 
</pre>