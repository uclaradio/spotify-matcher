const db = require("../models");
const ProfileEntry = db.profile_entries;

exports.create = (req, res) => {
    if (!req.body.username) {
        res.status(400).send({message: "Content cannot be empty!"});
        return;
    }

    const profile_entry = new ProfileEntry({
        username: req.body.username
    });

    profile_entry.save(profile_entry).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the ProfileEntry."
        });
    });
}

exports.findAll = (req, res) => {
    const username = req.query.username;
    const condition = username ? {username: username} : {};
    ProfileEntry.find(condition).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving every ProfileEntry."
        });
    });
}

exports.findOne = (req, res) => {
    const id = req.params.id;
    ProfileEntry.findById(id).then(data => {
        if (data) {
            res.send(data);
        } else {
            res.status(404).send({
                message: "Could not find ProfileEntry with id " + id
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving every ProfileEntry."
        });
    });
}

exports.update = (req, res) => {
    const id = req.params.id;
    ProfileEntry.findByIdAndUpdate(id, req.body, {useFindAnyModify: true}).then(data => {
        if (data) {
            res.send({
                message: "ProfileEntry was updated successfully."
            });
        } else {
            res.status(404).send({message: "Error retrieving ProfileEntry with id " + id});
        }
    });
}

exports.delete = (req, res) => {
    const id = req.params.id;
    ProfileEntry.findByIdAndRemove(id).then(data => {
        if (data) {
            res.send({
                message: "ProfileEntry was deleted successfully!"
            });
        } else {
            res.status(404).send({
                message: `Cannot delete ProfileEntry with id=${id}. Maybe ProfileEntry was not found!`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: "Could not delete ProfileEntry with id=" + id
        });
    });
}

exports.deleteAll = (req, res) => {
    ProfileEntry.deleteMany({}).then(data => {
        res.send({
            message: `${data.deletedCount} ProfileEntries were deleted successfully!`
        });
    })
}