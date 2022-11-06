import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

export interface IValues {
    [key: string]: any;
}

export interface IFormState {
    id: number,
    note: any;
    values: IValues;
    submitSuccess: boolean;
    loading: boolean;
}

class EditNote extends React.Component<RouteComponentProps<any>, IFormState> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            note: {},
            values: {},
            loading: false,
            submitSuccess: false,
        }
    }

    public componentDidMount(): void {
        const data = localStorage.getItem(this.state.id.toString());
        if (data) {
        const decrypt = atob(data);
        if (decrypt) {
            this.setState({ note: JSON.parse(decrypt) })
    }
}
}

    private processFormSubmission = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        this.setState({ loading: true });
        const formData = {
            title: this.state.values.title ? this.state.values.title : this.state.note.title,
            description: this.state.values.description ? this.state.values.description : this.state.note.description,
            id: this.state.note.id,
            created_at: this.state.note.created_at
        }
        const encryptedData = btoa(JSON.stringify(formData));
            localStorage.setItem(this.state.id.toString(), encryptedData);
            this.setState({ submitSuccess: true, loading: false })
            setTimeout(() => {
                this.props.history.push('/');
            }, 1500)
    }


    private setValues = (values: IValues) => {
        this.setState({ values: { ...this.state.values, ...values } });
    }

    private handleInputChanges = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        this.setValues({ [e.currentTarget.id]: e.currentTarget.value })
    }

    public render() {
        const { submitSuccess, loading } = this.state;
        return (
            <div className="App">
                {this.state.note &&
                    <div>
                        < h1 > Note List Management App</h1>
                        <p> Built with React.js and TypeScript </p>


                        <div>
                            <div className={"col-md-12 form-wrapper"}>
                                <h2> Edit Note </h2>

                                {submitSuccess && (
                                    <div className="alert alert-info" role="alert">
                                        Note details has been edited successfully </div>
                                )}

                                <form id={"create-note-form"} onSubmit={this.processFormSubmission} noValidate={true}>
                                    <div className="form-group col-md-12">
                                        <label htmlFor="title"> Tile </label>
                                        <input type="text" id="title" defaultValue={this.state.note.title} onChange={(e) => this.handleInputChanges(e)} name="title" className="form-control" placeholder="Enter Title" />
                                    </div>

                                    <div className="form-group col-md-12">
                                        <label htmlFor="description"> Description </label>
                                        <input type="text" id="description" defaultValue={this.state.note.description} onChange={(e) => this.handleInputChanges(e)} name="description" className="form-control" placeholder="Enter Description" />
                                    </div>

                                    <div className="form-group col-md-4 pull-right">
                                        <button className="btn btn-success" type="submit">
                                            Edit Note </button>
                                        {loading &&
                                            <span className="fa fa-circle-o-notch fa-spin" />
                                        }
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default withRouter(EditNote)
