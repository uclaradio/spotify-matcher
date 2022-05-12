module.exports = mongoose => {
    const Entry = mongoose.model(
        "profile_entry",
        mongoose.Schema(
            {
                username: {
                    type: String,
                    unique: true
                }
            },
            { timestamps: true }
        )
    );
    return Entry
};