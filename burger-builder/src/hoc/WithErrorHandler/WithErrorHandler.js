import React, { Component } from 'react';
import Aux from '../ReactAux/ReactAux';
import Modal from '../../components/UI/Modal/Modal';

const errorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }

        componentWillMount() {
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            });

            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
            });
        }
        
        componentWillUnmount() {
            this.reqInterceptor.request.eject(this.reqInterceptor);
            this.resInterceptor.response.eject(this.resInterceptor);
        }

        closeErrorModal() {
            this.setState({error: null});
        }

        render() {
            return (
                <Aux>
                    <Modal 
                        show={this.state.error}
                        modalClosed={this.closeErrorModal}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            )
        }
    }

}

export default errorHandler;