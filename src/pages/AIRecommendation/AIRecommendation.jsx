import { useState } from "react";
import products from "../../data/products";
import RecommendationResults from "./RecommendationResults";
import "./AIRecommendation.css";

const steps = [
    {
        key: "occasion",
        title: "What is the occasion?",
        options: [
            { value: "Birthday", label: "Birthday", icon: "🎂" },
            { value: "Anniversary", label: "Anniversary", icon: "💍" },
            { value: "Romance", label: "Romance", icon: "💗" },
            { value: "Wedding", label: "Wedding", icon: "💒" },
            { value: "Mother's Day", label: "Mother's Day", icon: "👩" },
            { value: "Thank You", label: "Thank You", icon: "🙏" },
            { value: "Congratulations", label: "Congratulations", icon: "🎉" },
            { value: "Get Well", label: "Get Well", icon: "💐" },
        ],
    },
    {
        key: "budget",
        title: "What is your budget?",
        options: [
            { value: "under280", label: "Under ₱280", icon: "💚" },
            { value: "range280to300", label: "₱280–₱300", icon: "💛" },
            { value: "range301to350", label: "₱301–₱350", icon: "🧡" },
            { value: "noLimit", label: "No limit", icon: "💜" },
        ],
    },
    {
        key: "palette",
        title: "Preferred color palette?",
        options: [
            { value: "pinksReds", label: "Pinks & Reds", icon: "🌹" },
            { value: "purplesLavender", label: "Purples & Lavender", icon: "💜" },
            { value: "whitesCreams", label: "Whites & Creams", icon: "🤍" },
            { value: "yellowsOranges", label: "Yellows & Oranges", icon: "🌻" },
            { value: "mixedColorful", label: "Mixed & Colorful", icon: "🌈" },
        ],
    },
    {
        key: "recipient",
        title: "Who is it for?",
        options: [
            { value: "partner", label: "Partner / Spouse", icon: "💑" },
            { value: "family", label: "Family Member", icon: "👨‍👩‍👧" },
            { value: "friend", label: "Friend", icon: "🧑‍🤝‍🧑" },
            { value: "colleague", label: "Colleague", icon: "👔" },
            { value: "myself", label: "Myself", icon: "🙋" },
        ],
    },
];

const initialAnswers = {
    occasion: "",
    budget: "",
    palette: "",
    recipient: "",
};

function AIRecommendation() {
    const [stepIndex, setStepIndex] = useState(0);
    const [answers, setAnswers] = useState(initialAnswers);
    const [showResults, setShowResults] = useState(false);

    const currentStep = steps[stepIndex];
    const selectedValue = answers[currentStep.key];

    const chooseOption = (value) => {
        setAnswers((previous) => ({
            ...previous,
            [currentStep.key]: value,
        }));
    };

    const goNext = () => {
        if (!selectedValue) return;

        if (stepIndex < steps.length - 1) {
            setStepIndex((previous) => previous + 1);
        } else {
            setShowResults(true);
        }
    };

    const goBack = () => {
        if (stepIndex > 0) {
            setStepIndex((previous) => previous - 1);
        }
    };

    const restart = () => {
        setAnswers(initialAnswers);
        setStepIndex(0);
        setShowResults(false);
    };

    if (showResults) {
        return (
            <RecommendationResults
                products={products}
                answers={answers}
                onStartOver={restart}
            />
        );
    }

    return (
        <main className="ai-recommendation-page">
            <header className="ai-rec-banner">
                <i className="bi bi-stars" aria-hidden="true"></i>
                <h1>AI Bouquet Advisor</h1>
                <p>
                    Answer a few questions — we'll find your perfect match
                </p>
            </header>

            <section className="ai-rec-card">
                <div className="ai-rec-progress-track">
                    <div
                        className="ai-rec-progress-fill"
                        style={{
                            width: `${((stepIndex + 1) / steps.length) * 100}%`,
                        }}
                    />
                </div>

                <div className="ai-rec-card-content">
                    <div className="ai-rec-step-row">
                        <span className="ai-rec-step-label">
                            Step {stepIndex + 1} of {steps.length}
                        </span>

                        {stepIndex > 0 && (
                            <button
                                type="button"
                                className="ai-rec-back"
                                onClick={goBack}
                            >
                                ← Back
                            </button>
                        )}
                    </div>

                    <h2>{currentStep.title}</h2>

                    <div className="ai-rec-options">
                        {currentStep.options.map((option) => (
                            <button
                                type="button"
                                key={option.value}
                                className={`ai-rec-option ${
                                    selectedValue === option.value
                                        ? "selected"
                                        : ""
                                }`}
                                aria-pressed={
                                    selectedValue === option.value
                                }
                                onClick={() => chooseOption(option.value)}
                            >
                                <span className="ai-rec-option-icon">
                                    {option.icon}
                                </span>
                                <span>{option.label}</span>
                            </button>
                        ))}
                    </div>

                    <div className="ai-rec-card-footer">
                        <div className="ai-rec-choices">
                            <span>Your choices so far:</span>

                            <div className="ai-rec-choice-tags">
                                {steps.slice(0, stepIndex + 1).map((step) => {
                                    const option = step.options.find(
                                        (item) =>
                                            item.value === answers[step.key]
                                    );

                                    return option ? (
                                        <span key={step.key}>
                                            {option.icon} {option.label}
                                        </span>
                                    ) : null;
                                })}
                            </div>
                        </div>

                        <button
                            type="button"
                            className="ai-rec-next"
                            disabled={!selectedValue}
                            onClick={goNext}
                        >
                            {stepIndex === steps.length - 1
                                ? "Find My Bouquets"
                                : "Continue"}
                            <i
                                className="bi bi-arrow-right"
                                aria-hidden="true"
                            ></i>
                        </button>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default AIRecommendation;
