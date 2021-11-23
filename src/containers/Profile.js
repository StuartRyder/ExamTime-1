/* This File contains all commands and code pertaining to Profile Page of the Website */
import React from "react";
import { List, Skeleton } from "antd";
import { connect } from "react-redux";
import Result from "../components/Result";
import { getGradedASNTS } from "../store/actions/gradedAssignments";
import Hoc from "../hoc/hoc";
// profile contains student's performance latest first.
class Profile extends React.PureComponent {
    componentDidMount() {
        if (this.props.token !== undefined && this.props.token !== null) {
            this.props.getGradedASNTS(this.props.username, this.props.token);
        }
    }

    componentWillReceiveProps(newProps) {
        if (newProps.token !== this.props.token) {
            if (newProps.token !== undefined && newProps.token !== null) {
                this.props.getGradedASNTS(newProps.username, newProps.token);
            }
        }
    }

    render() {
        console.log(this.props.gradedAssignments)
        return (
            <Hoc>
                {this.props.loading ? (
                    <Skeleton active />
                ) : (
                    <Hoc>
                        <h1>Hi {this.props.username}</h1>
                        <List
                            size="large"
                            dataSource={this.props.gradedAssignments.reverse()}
                            renderItem={a => <Result key={a.id} grade={a.grade} title={a.assignment}/>}
                        />
                    </Hoc>
                )}
            </Hoc>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        username: state.auth.username,
        gradedAssignments: state.gradedAssignments.assignments,
        loading: state.gradedAssignments.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGradedASNTS: (username, token) =>
            dispatch(getGradedASNTS(username, token))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile);
